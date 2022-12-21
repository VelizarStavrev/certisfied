import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfaces/login';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public router: Router) { }

  userUrl = 'http://localhost:8000/user';

  userRegister() {
    // TO DO - add user register
  }

  userLogin(username: string, password: string) {
    const data: object = { username, password };
    return this.http.post<Login>(this.userUrl + '/login', data);
  }

  userLogout(): void {
    localStorage.removeItem('token');
    this.setUserStatus();
    this.router.navigate(['/login']);
    
    // TO DO - add message
  }

  // Allow the user status to be subscribed to
  userStatus: Subject<boolean> = new Subject<boolean>();

  setUserStatus(): boolean {
    const currentUserStatus = !!localStorage.getItem('token');
    this.userStatus.next(currentUserStatus);
    return currentUserStatus;
  }
}
