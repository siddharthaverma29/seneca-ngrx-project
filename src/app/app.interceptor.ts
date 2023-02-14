import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      params: new HttpParams()
        .set('q', 'Apple')
        .set('apiKey', 'f78e7ecf8e4f4e1c88039d34cacbf3d0'),
      // .set('sortBy', 'popularity')
      // .set('pageSize', 10),
    });
    return next.handle(modifiedReq);
  }
}
