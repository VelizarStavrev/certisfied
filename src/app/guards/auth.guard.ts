import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    public router: Router,
    public userService: UserService,
    public messageService: MessageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userToken = this.userService.getUserToken();

    if (!userToken) {
      // Add an error message
      this.messageService.setMessage({type: 'message-error', message: 'You need to be logged in to access this route.'});
    
      // Redirect to the templates list
      this.router.navigate(['/']);

      return false;
    }
    
    return true;
  }
  
}
