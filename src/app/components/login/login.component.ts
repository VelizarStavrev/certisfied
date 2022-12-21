import { Component, OnInit } from '@angular/core';

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
    console.log('username', this.username);
    console.log('password', this.password);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
