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
  buttonText: string = 'Login';
  buttonType: string = 'Primary';
  buttonHTMLType: string = 'submit';
  buttonMarginTop: boolean = true;
  buttonWidth80: boolean = true;
  buttonLink: string = '/password-reset';
  buttonTypeLink: string = 'Link';
  buttonTextLink: string = 'Forgotten password?';
  buttonLinkSecond: string = '/register';
  buttonTypeLinkSecond: string = 'Secondary';
  buttonTextLinkSecond: string = 'Register';
  buttonTextLinkSecondWidth80: boolean = true;
  username: string = '';
  password: string = '';
  formError: boolean = false;
  formErrorMessage: string = 'Form error';

  onSubmit(): void {
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
        this.router.navigate(['/dashboard/certificates']);

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
