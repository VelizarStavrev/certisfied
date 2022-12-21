import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible: boolean = false;
  isChanged: boolean = false;
  hamburgerClassList: string[] = ['hamburger-button'];

  // Set the isLogged to false initially
  // Update it whenever the user status is updated
  isLogged: boolean = this.userService.setUserStatus();
  _subscription = this.userService.userStatus.subscribe((value) => {
    this.isLogged = value;
  });

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  toggleVisibleClass() {
    this.isVisible = !this.isVisible;

    if (this.isVisible) {
      this.hamburgerClassList = ['hamburger-button', 'active'];
    }

    if (this.isChanged && !this.isVisible) {
      this.hamburgerClassList = ['hamburger-button', 'active-reverse'];
    }

    this.isChanged = true;
  }
}
