import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getTokenUser;
    const requestUrl = request.url.split('/')
    if (token && requestUrl[1] === "customer") {
      request = request.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }

    return next.handle(request);
  }
}