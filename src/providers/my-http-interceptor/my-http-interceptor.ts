import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/throw'
import { Injectable } from '@angular/core';

/*
  Generated class for the MyHttpInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyHttpInterceptorProvider implements HttpInterceptor {
    authReq = null;

    constructor(private auth: AuthProvider,
                public appCtrl: App) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = req;
        const token = window.localStorage.getItem('token');
        if(token){
            authRequest = req.clone({
                headers: req.headers
                    .set("Authorization", `Bearer ${this.auth.obterToken()}`)
                    .set('Content-Type', 'application/json')
            });
        }

        return next.handle(authRequest);
    }
}
