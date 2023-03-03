import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    component.currentYear = 2000;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an extra div element for spacing', () => {
    const extraDiv = de.query(By.css('footer .footer-text-and-link-container div'));

    expect(extraDiv).toBeTruthy();
  });

  it('should have the current year', () => {
    const currentYear = new Date().getFullYear();
    const currentYearParagraph = de.query(By.css('footer .footer-text-and-link-container p'));

    expect(currentYearParagraph).toBeTruthy();
    expect(currentYearParagraph.nativeNode.innerText).toEqual(`©${ currentYear } Certisfied`);
  });

  it('should have an unordered list with two links', () => {
    const uoList = de.query(By.css('footer .footer-text-and-link-container ul'));

    expect(uoList).toBeTruthy();
    expect(uoList.children.length).toEqual(2);
    expect(uoList.children[0].query(By.css('a')).nativeNode.innerText).toEqual('Terms of use');
    expect(uoList.children[1].query(By.css('a')).nativeNode.innerText).toEqual('Privacy policy');
  });
});
