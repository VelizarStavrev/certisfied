import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  formError: boolean = false;

  onSubmit() {
    // Remove the form error
    this.formError = false;

    // Send the form if it is valid
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // TO DO - send the request with a service and handle it on fail
      return;
    }

    // Set the form error
    this.formError = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
