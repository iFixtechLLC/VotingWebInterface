import { Http } from '@angular/http';

export function backendFactory(backend, options) { return new Http(backend, options); }
