import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  buttonText: string = 'Send';
  buttonType: string = 'Primary';
  buttonHTMlType: string = 'button';
  buttonMarginTop: boolean = true;
  email: string = '';
  names: string = '';
  message: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  sendData(): void {
    const data = {
      email: this.email,
      names: this.names,
      message: this.message,
    };

    // TO DO
    console.log('Send the contact data!', data);
  }
}
