import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MessageService } from './message.service';
import { variables } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public router: Router, public messageService: MessageService) { }

  userUrl = variables.serverURL + '/user';

  userRegister(data: object) {
    return this.http.post<Register>(this.userUrl + '/register', data);
  }

  userLogin(username: string, password: string) {
    const data: object = { username, password };
    return this.http.post<Login>(this.userUrl + '/login', data);
  }

  userLogout(): void {
    localStorage.removeItem('token');
    this.setUserStatus();
    this.router.navigate(['/login']);

    // Add a message for successful logout
    this.messageService.setMessage({type: 'message-success', message: 'Successfully logged out.'});
  }

  // Allow the user status to be subscribed to
  userStatus: Subject<boolean> = new Subject<boolean>();

  setUserStatus(): boolean {
    const currentUserStatus = !!localStorage.getItem('token');
    this.userStatus.next(currentUserStatus);
    return currentUserStatus;
  }

  getUserToken(): string | null {
    const currentUserToken: string | null = localStorage.getItem('token');
    return currentUserToken;
  }
}
