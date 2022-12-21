import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  buttonText = 'Login';
  buttonType = 'Primary';
  buttonHTMLType = 'submit';
  buttonMarginTop = 'true';
  buttonLink = '/password-reset';
  buttonTypeLink = 'Link';
  buttonTextLink = 'Forgotten password?';
  buttonLinkSecond = '/register';
  buttonTypeLinkSecond = 'Secondary';
  buttonTextLinkSecond = 'Register';
  username = '';
  password = '';
  formError = false;
  formErrorMessage = 'Form error';

  onSubmit() {
    this.formError = false;
    
    this.userService.userLogin(this.username, this.password)
      .subscribe((data: Login) => {

        if (!data.status) {
          this.formError = true;
          this.formErrorMessage = data.message;
          return;
        }

        localStorage.setItem('token', data.token);
        this.userService.setUserStatus();
        // this.router.navigate(['/dashboard/certificates']);
        this.router.navigate(['/']);
      });
  }

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

}
