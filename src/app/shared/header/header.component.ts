import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible: boolean = false;
  isChanged: boolean = false;
  hamburgerClassList: string[] = ['hamburger-button'];

  constructor() { }

  ngOnInit(): void {
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
