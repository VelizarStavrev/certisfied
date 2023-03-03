import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services//user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible: boolean = false;
  isChanged: boolean = false;
  hamburgerClassList: string[] = ['hamburger-button'];
  isLogged: boolean = this.userService.setUserStatus();
  private _subscription: Subscription = Subscription.EMPTY;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this._subscription = this.userService.userStatus.subscribe((value) => {
      this.isLogged = value;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  toggleVisibleClass(): void {
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
