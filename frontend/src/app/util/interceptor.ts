import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function authorizationInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn){
  const bearerToken = 'Bearer mock-token'
  const newReq = req.clone({
    headers: req.headers.append('Authorization', bearerToken)
  })
  return next(newReq)
}
