import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  buttonText: string = 'Logout';
  buttonType: string = 'Secondary';
  buttonHTMLType: string = 'button';
  
  buttonFunc(): void {
    this.userService.userLogout();
  }

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
