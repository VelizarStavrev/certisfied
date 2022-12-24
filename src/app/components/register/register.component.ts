import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/interfaces/register';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  buttonText: string = 'Register';
  buttonType: string = 'Primary';
  buttonHTMLType: string = 'submit';
  buttonMarginTop: boolean = true;
  buttonWidth80: boolean = true;
  buttonLink: string = '/login';
  buttonTypeLink: string = 'Secondary';
  buttonTextLink: string = 'Login';
  buttonTextLinkWidth80: boolean = true;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get email() { return this.registerForm.get('email'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get repassword() { return this.registerForm.get('repassword'); }
  emailExistsError: boolean = false;
  usernameExistsError: boolean = false;
  formError: boolean = false;

  onSubmit() {
    // Remove the form errors
    this.formError = false;
    this.emailExistsError = false;
    this.usernameExistsError = false;

    // Show the loader
    this.loaderService.showLoader(true);

    // Send the form if it is valid
    if (this.registerForm.valid) {
      this.userService.userRegister(this.registerForm.value)
        .subscribe((data: Register) => {
          if (data.status) {
            // Add a message for successful registration
            this.messageService.setMessage({type: 'message-success', message: 'Successfully logged in.'});

            this.router.navigate(['/login']);

            // Hide the loader
            this.loaderService.showLoader(false);
            return;
          }

          switch (data.type) {
            case 'exists-email':
              this.emailExistsError = true;
              break;

            case 'exists-username':
              this.usernameExistsError = true;
              break;

            case 'error':
            default:
              this.formError = true;
          }

          this.formError = true;

          // Add an error message for unsuccessful registration
          this.messageService.setMessage({type: 'message-error', message: 'An error occured.'});

          // Hide the loader
          this.loaderService.showLoader(false);
        });
      return;
    }

    // Set the form error
    this.formError = true;
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
