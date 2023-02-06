import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from 'src/app/components/shared/button/button.component';

import { FieldAddComponent } from './field-add.component';

describe('FieldAddComponent', () => {
  let component: FieldAddComponent;
  let fixture: ComponentFixture<FieldAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        FieldAddComponent, 
        ButtonComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
