import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';

import { routes } from './app.routes';
import { authorizationInterceptor } from './util/interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authorizationInterceptor])),
    provideRouter(routes)
  ]
};
