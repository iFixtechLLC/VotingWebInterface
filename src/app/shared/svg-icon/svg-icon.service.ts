import { Injectable } from '@angular/core';

import { WindowRef } from '../window-ref';

@Injectable()
export class SVGIconService {
    private _cache: Object = {};
    private _queue: Object = {};
    private _injectCount = 0;
    private _isLocal: boolean;

    private _cloneSvg(sourceSvg: SVGElement) {
        return sourceSvg.cloneNode(true);
    }

    private _processRequestQueue(url: string) {
        for (let i = 0; i < this._queue[url].length; i++) {
            // Make these calls async so we avoid blocking the page/renderer
            ((index) => {
                setTimeout(() => {
                    this._queue[url][index](this._cloneSvg(this._cache[url]));
                }, 0);
            })(i);
        }
    }

    private _queueRequest(url: string, callback: Function) {
        this._queue[url] = this._queue[url] || [];
        this._queue[url].push(callback);
    }

    injectElement(src: string, nativeEl: HTMLElement) {
        if (!(/\.svg/i).test(src)) {
            console.log('Attempted to inject a file with a non-svg extension: ' + src);
            return;
        }

        this._loadSvg(src, (svg: SVGElement) => {
            if (typeof svg === 'undefined' || typeof svg === 'string') {
                return false;
            }

            const iriElementsAndProperties = {
                'clipPath': ['clip-path'],
                'color-profile': ['color-profile'],
                'cursor': ['cursor'],
                'filter': ['filter'],
                'linearGradient': ['fill', 'stroke'],
                'marker': ['marker', 'marker-start', 'marker-mid', 'marker-end'],
                'mask': ['mask'],
                'pattern': ['fill', 'stroke'],
                'radialGradient': ['fill', 'stroke']
            };

            let element, elementDefs, properties, currentId, newId;
            Object.keys(iriElementsAndProperties).forEach((key) => {
                element = key;
                properties = iriElementsAndProperties[key];

                elementDefs = svg.querySelectorAll('defs ' + element + '[id]');
                for (let i = 0; i < elementDefs.length; i++) {
                    currentId = elementDefs[i].id;
                    newId = currentId + '-' + this._injectCount;

                    // All of the properties that can reference this element type
                    let referencingElements;
                    properties.forEach((property) => {
                        // :NOTE: using a substring match attr selector here to deal with IE "adding extra quotes in url() attrs"
                        referencingElements = svg.querySelectorAll('[' + property + '*="' + currentId + '"]');
                        for (let j = 0; j < referencingElements.length; j++) {
                            referencingElements[j].setAttribute(property, 'url(#' + newId + ')');
                        }
                    });

                    elementDefs[i].id = newId;
                }
            });

            // Remove any unwanted/invalid namespaces that might have been added by SVG editing tools
            svg.removeAttribute('xmlns:a');

            for (let i = 0; i < nativeEl.childNodes.length; i++) {
                const childNode = nativeEl.childNodes[i];
                nativeEl.removeChild(childNode);
            }

            nativeEl.appendChild(svg);

            // Increment the injected count
            this._injectCount++;
        });
    }

    private _loadSvg(url: string, callback: Function) {
        if (this._cache[url] !== undefined) {
            if (this._cache[url] instanceof SVGElement) {
                // SVG has already been loaded and cached, so clone it
                callback(this._cloneSvg(this._cache[url]));
            } else {
                // SVG is currently being loaded, so queue the inject request
                this._queueRequest(url, callback);
            }
        } else {
            this._cache[url] = {};
            this._queueRequest(url, callback);

            const httpRequest = new XMLHttpRequest();

            httpRequest.onreadystatechange = () => {
                // readyState 4 = complete
                if (httpRequest.readyState === 4) {

                    // Handle status
                    if (httpRequest.status === 404 || httpRequest.responseXML === null) {
                        console.log('Unable to load SVG file: ' + url);
                        if (this._isLocal) {
                            console.log(`
                                Note: SVG injection ajax calls do not work locally without
                                adjusting security setting in your browser. Or consider
                                using a local webserver.
                            `);
                        }
                        callback();
                        return false;
                    }

                    // 200 success from server
                    if (httpRequest.status === 200 || (this._isLocal && httpRequest.status === 0)) {

                        if (httpRequest.responseXML instanceof Document) {
                            // Cache it
                            this._cache[url] = httpRequest.responseXML.documentElement;
                        }

                        // We've loaded a new asset, so process any requests waiting for it
                        this._processRequestQueue(url);
                    } else {
                        callback('There was a problem injecting the SVG: ' + httpRequest.status + ' ' + httpRequest.statusText);
                        return false;
                    }
                }
            };

            httpRequest.open('GET', url);

            // Treat and parse the response as XML, even if the
            // server sends us a different mimetype
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
            }

            httpRequest.send();
        }
    }

    constructor(
        private _windowRef: WindowRef
    ) {
        const win = this._windowRef.nativeWindow;
        this._isLocal = win && win.location && win.location.protocol === 'file:';
    }
}
