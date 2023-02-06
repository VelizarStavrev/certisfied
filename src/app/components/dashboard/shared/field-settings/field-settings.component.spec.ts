import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from 'src/app/components/shared/button/button.component';

import { FieldSettingsComponent } from './field-settings.component';

describe('FieldSettingsComponent', () => {
  let component: FieldSettingsComponent;
  let fixture: ComponentFixture<FieldSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FieldSettingsComponent, 
        ButtonComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
