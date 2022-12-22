import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/interfaces/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  buttonText: string = 'Register';
  buttonType: string = 'Primary';
  buttonHTMLType: string = 'submit';
  buttonMarginTop: string = 'true';
  buttonLink: string = '/login';
  buttonTypeLink: string = 'Secondary';
  buttonTextLink: string = 'Login';

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

    // TO DO - Start the loader

    // Send the form if it is valid
    if (this.registerForm.valid) {
      this.userService.userRegister(this.registerForm.value)
        .subscribe((data: Register) => {
          if (data.status) {
            // TO DO - add message
            // TO DO - hide loader

            this.router.navigate(['/login']);
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
          console.log(this.emailExistsError);
          // TO DO - add message
          // TO DO - hide loader
        });
      return;
    }

    // Set the form error
    this.formError = true;
  }

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit(): void {
  }

}
