import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';

import { HeaderComponent } from './header.component';
declare const viewport: any;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        UserService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to home with the site name', () => {
    const element = de.query(By.css('a.link-home'));
    expect(element).toBeTruthy();
    expect(element.nativeNode.innerText).toEqual('certisfied');
    expect(element.attributes['routerLink']).toEqual('/');
  });

  describe('hamburger button', () => {
    let element: DebugElement;
    let elementClassList: DOMTokenList;

    beforeEach(() => {
      element = de.query(By.css('.hamburger-button'));
      elementClassList = element.nativeElement.classList;
    });

    it('should exist', () => {
      expect(element).toBeTruthy();
    });

    it('should be hidden on screens above 776px and not have an active class set', () => {
      function getElementDisplayValue() {
        return window.getComputedStyle(element.nativeElement).getPropertyValue('display');
      };

      let elementDisplayValue;

      viewport.set(800);
      elementDisplayValue = getElementDisplayValue();
      expect(elementDisplayValue).toEqual('none');

      viewport.set(200);
      elementDisplayValue = getElementDisplayValue();
      expect(elementDisplayValue).toEqual('block');

      viewport.set(800);
      elementDisplayValue = getElementDisplayValue();
      expect(elementDisplayValue).toEqual('none');

      expect(elementClassList.contains('active')).toBeFalse();
      expect(elementClassList.contains('active-reverse')).toBeFalse();
    });

    it('should set the active class when first clicked and add the reverse-active class when clicked again', () => {
      expect(elementClassList.contains('active')).toBeFalse();
      expect(elementClassList.contains('active-reverse')).toBeFalse();

      element.nativeElement.click();
      fixture.detectChanges();
      elementClassList = element.nativeElement.classList;
      expect(elementClassList.contains('active')).toBeTrue();
      expect(elementClassList.contains('active-reverse')).toBeFalse();

      element.nativeElement.click();
      fixture.detectChanges();
      elementClassList = element.nativeElement.classList;
      expect(elementClassList.contains('active')).toBeFalse();
      expect(elementClassList.contains('active-reverse')).toBeTrue();

      element.nativeElement.click();
      fixture.detectChanges();
      elementClassList = element.nativeElement.classList;
      expect(elementClassList.contains('active')).toBeTrue();
      expect(elementClassList.contains('active-reverse')).toBeFalse();
    });

    describe('ul', () => {
      let ulElement: DebugElement;
      let ulElementClassList: DOMTokenList;

      beforeEach(() => {
        ulElement = de.query(By.css('header nav ul'));
        ulElementClassList = ulElement.nativeElement.classList;
      });

      it('should exist and not have the visible class', () => {
        expect(ulElement).toBeTruthy();
        expect(ulElementClassList.contains('visible')).toBeFalse();
      });

      it('should have the visible class when the hamburger button is clicked', () => {
        expect(ulElementClassList.contains('visible')).toBeFalse();

        element.nativeElement.click();
        fixture.detectChanges();
        ulElementClassList = ulElement.nativeElement.classList;
        expect(ulElementClassList.contains('visible')).toBeTrue();

        element.nativeElement.click();
        fixture.detectChanges();
        ulElementClassList = ulElement.nativeElement.classList;
        expect(ulElementClassList.contains('visible')).toBeFalse();
      });
    });
  });

  describe('ul', () => {
    let ulElement: DebugElement;

    beforeEach(() => {
      ulElement = de.query(By.css('header nav ul'));
    });

    describe('link content', () => {
      let linksArray: (string | null)[];
      let expectedLinksArray: (string | null)[];
      let ulLiLinkDE: DebugElement[];

      beforeEach(() => {
        linksArray = [];

        expectedLinksArray = [
          '/verify',
          '/documentation',
          '/contacts',
        ];

        component.isLogged = false;
        fixture.detectChanges();
      });

      it('should have the login and register anchor elements when not logged in', () => {
        ulLiLinkDE = ulElement.queryAll(By.css('a'));
        expectedLinksArray.unshift('/login', '/register');

        ulLiLinkDE.forEach(a => {
          linksArray.push(a.attributes['routerLink']);
        });

        expect(linksArray).toEqual(expectedLinksArray);
      });

      it('should have the login and register anchor elements when logged in', () => {
        component.isLogged = true;
        fixture.detectChanges();
        ulLiLinkDE = ulElement.queryAll(By.css('a'));
        expectedLinksArray.unshift('/dashboard', '/profile');

        ulLiLinkDE.forEach(a => {
          linksArray.push(a.attributes['routerLink']);
        });

        expect(linksArray).toEqual(expectedLinksArray);
      });
    });

  });

  describe('#userService', () => {
    beforeEach(() => {
      localStorage.removeItem('token');
      userService.setUserStatus();
    });

    it('should update isLogged when the userStatus from the user service is triggered', () => {
      expect(component.isLogged).toBeFalse();

      localStorage.setItem('token', 'fakeTokenValue');
      userService.setUserStatus();
      expect(component.isLogged).toBeTrue();

      localStorage.removeItem('token');
      userService.setUserStatus();
      expect(component.isLogged).toBeFalse();
    });
  });

});
