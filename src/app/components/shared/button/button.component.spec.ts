import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default params', () => {
    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-primary']);
    expect(component.buttonDisabled).toEqual(false);
    expect(component.buttonHTMLType).toEqual('button');
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

    expect(component.buttonClasses).toEqual(['button-base', 'button-secondary']);
  });

  it('buttonClasses should set error', () => {
    component.buttonType = 'Error';

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-error']);
  });

  it('buttonClasses should set primary if no case is found', () => {
    component.buttonType = 'NonExistingCase';

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-primary']);
  });

  it('buttonClasses should set margin classes', () => {
    component.buttonMarginTop = true;
    component.buttonMarginBottom = true;
    component.buttonMarginLeft = true;
    component.buttonMarginRight = true;

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual([
      'button-base', 
      'button-primary',
      'button-margin-top',
      'button-margin-bottom',
      'button-margin-left',
      'button-margin-right'
    ]);
  });

  it('buttonClasses should set the button width 80 class', () => {
    component.buttonWidth80 = true;

    fixture.detectChanges();

    expect(component.buttonClasses).toEqual(['button-base', 'button-primary', 'button-width-80']);
  });
});
