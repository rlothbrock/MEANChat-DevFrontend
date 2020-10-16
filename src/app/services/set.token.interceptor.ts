import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class SetTokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService){}
  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
      // console.log('usando interceptor en la request: ', request.url);
      return this.auth.userSubject.pipe(
        take(1),
        exhaustMap( user => {
          if (!user){
            // console.log('no hay user en el interceptor, soltando el hilo')
            return next.handle(request);
          }
          // console.log('usuario detectado por el interceptor: ', user);
          const modifiedReq = request.clone({
            headers: new HttpHeaders().append('Authorization', `Bearer ${user.token}`)
          });
          return next.handle(modifiedReq);
        }));
    }

  }



