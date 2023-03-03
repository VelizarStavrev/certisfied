import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonLinkComponent } from './button-link.component';

describe('ButtonLinkComponent', () => {
  let component: ButtonLinkComponent;
  let fixture: ComponentFixture<ButtonLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonLinkComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLinkComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default params', () => {
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-primary']);
    expect(component.buttonMarginBottom).toEqual(false);
    expect(component.buttonMarginLeft).toEqual(false);
    expect(component.buttonMarginRight).toEqual(false);
    expect(component.buttonMarginTop).toEqual(false);
    expect(component.buttonText).toEqual('Click');
    expect(component.buttonMarginBottom).toEqual(false);
    expect(component.buttonType).toEqual('Primary');
    expect(component.buttonWidth80).toEqual(false);
  });

  it('buttonClasses should set secondary', () => {
    component.buttonType = 'Secondary';

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-secondary']);
  });

  it('buttonClasses should set plain', () => {
    component.buttonType = 'Link';

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-plain']);
  });

  it('buttonClasses should set plain if no case is found', () => {
    component.buttonType = 'NonExistingCase';

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-plain']);
  });

  it('buttonClasses should set margin classes', () => {
    component.buttonMarginTop = true;
    component.buttonMarginBottom = true;
    component.buttonMarginLeft = true;
    component.buttonMarginRight = true;

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual([
      'link-button', 
      'link-button-primary',
      'button-margin-top',
      'button-margin-bottom',
      'button-margin-left',
      'button-margin-right'
    ]);
  });

  it('buttonClasses should set the button width 80 class', () => {
    component.buttonWidth80 = true;

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['link-button', 'link-button-primary', 'button-width-80']);
  });
});
