import { Injectable, isDevMode, Injector } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';

@Injectable()
export class ConfigService {
    private get DEV_CONFIG_LOCATION(): string { return 'config/dev.json'; };
    private get PROD_CONFIG_LOCATION(): string { return 'config/prod.json'; };

    protected _config: { [key: string]: any };

    constructor() { }

    load(): Promise<any> {
        return this._fetchConfig(this.PROD_CONFIG_LOCATION)
            .then((prodConfig) => {
                if (isDevMode()) {
                    return this._fetchConfig(this.DEV_CONFIG_LOCATION)
                        .then((devConfig) => {
                            this._config = Object.assign(prodConfig, devConfig);
                        })
                        .catch(() => {
                            console.log('Falling back to prod config');
                        });
                }

                this._config = prodConfig;
            });
    }

    get(key: string): any {
        if (!this._config) {
            return null;
        }

        return this._config[key];
    }

    private _fetchConfig(url): Promise<any> {
        return new Promise((resolve, reject) => {
            // This can't use the Http service because if our backend is mocked
            // everything will fall apart
            const httpRequest = new XMLHttpRequest();

            httpRequest.onreadystatechange = () => {
                // readyState 4 = complete
                if (httpRequest.readyState === 4) {

                    // Handle status
                    if (httpRequest.status === 404 || !httpRequest.responseText) {
                        console.log(`Unable to load config: ${url}`);
                        reject();
                        return;
                    }

                    // 200 success from server
                    if (httpRequest.status === 200) {
                        let config;
                        try {
                            config = JSON.parse(httpRequest.responseText);
                        } catch (e) {
                            console.log(`Unable to load config: ${url}`);
                            reject();
                        }
                        resolve(config);
                    } else {
                        console.error(`Error: status ${httpRequest.status}`);
                        reject();
                    }
                }
            };

            httpRequest.open('GET', url);
            httpRequest.send();
        });
    }
}

export function configFactory(config: ConfigService, injector: Injector) {
    return () => {
        const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
        return locationInitialized
            .then(() => {
                return config.load();
            });
    };
}
