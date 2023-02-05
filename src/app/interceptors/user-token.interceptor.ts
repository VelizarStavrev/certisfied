import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = this.userService.getUserToken();
    const bearerToken = 'Bearer ' + userToken;
    const requestWithHeader = request.clone({ headers: request.headers.set('Authorization', bearerToken) });

    return next.handle(requestWithHeader);
  }
}
