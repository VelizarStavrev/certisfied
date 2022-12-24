import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Login } from '../../interfaces/login';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { LoaderService } from 'src/app/services/loader.service';

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
    // Remove the form errors
    this.formError = false;
    
    // Show the loader
    this.loaderService.showLoader(true);

    // Send the form data
    this.userService.userLogin(this.username, this.password)
      .subscribe((data: Login) => {
        if (!data.status) {
          this.formError = true;
          this.formErrorMessage = data.message;
          this.loaderService.showLoader(false);
          return;
        }

        localStorage.setItem('token', data.token);
        this.userService.setUserStatus();
        // this.router.navigate(['/dashboard/certificates']);
        this.router.navigate(['/']);

        // Add a message for successful login
        this.messageService.setMessage({type: 'message-success', message: 'Successfully logged in.'});

        // Hide the loader
        this.loaderService.showLoader(false);
      });
  }

  constructor(
    public userService: UserService, 
    public router: Router, 
    public messageService: MessageService, 
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
  }

}
