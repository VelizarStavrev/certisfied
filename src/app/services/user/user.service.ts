import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Register } from 'src/app/interfaces/register';
import { Login } from 'src/app/interfaces/login';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MessageService } from 'src/app/services/message/message.service';
import { variables } from 'src/app/variables';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = variables.serverURL + '/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  userRegister(data: {}) {
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
    this.messageService.setMessage({ type: 'message-success', message: 'Successfully logged out.' });
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
