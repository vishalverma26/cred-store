import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSvc: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authSvc.userSubject.pipe(take(1), exhaustMap(user => {

      if (req.url.includes('signUp') || req.url.includes('signIn')) {
        const newReq = req.clone({
          params: new HttpParams().set('key', environment.api_key)
        });
        return next.handle(newReq);
      } else {
        if(!user) {
          return next.handle(req);
        } else {
          const newReq = req.clone({
            params: new HttpParams().append('auth', user.token)
          });
          return next.handle(newReq);
        }
      }
    }));


  }
}
