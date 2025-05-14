import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< Updated upstream
=======
import { withInterceptors, provideHttpClient } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
>>>>>>> Stashed changes

import { routes } from './app.routes';
import { authorizationInterceptor } from './util/interceptor';


export const appConfig: ApplicationConfig = {
<<<<<<< Updated upstream
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
=======
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([authorizationInterceptor])),
    provideRouter(routes)
  ]
>>>>>>> Stashed changes
};
