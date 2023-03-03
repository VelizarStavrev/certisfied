import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoaderService } from 'src/app/services/loader/loader.service';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let de: DebugElement;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoaderComponent, 
      ],
      providers: [
        LoaderService 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    loaderService = TestBed.inject(LoaderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible by default', () => {
    expect(component.isLoaderVisible).toBeFalse();
  });

  it('should update when the loader service is triggered', () => {
    expect(component.isLoaderVisible).toBeFalse();
    expect(de.query(By.css('.loader-container.hidden'))).toBeTruthy();

    loaderService.showLoader(true);
    fixture.detectChanges();
    expect(de.query(By.css('.loader-container.hidden'))).toBeNull();
    expect(component.isLoaderVisible).toBeTrue();

    loaderService.showLoader(false);
    fixture.detectChanges();
    expect(de.query(By.css('.loader-container.hidden'))).toBeTruthy();
    expect(component.isLoaderVisible).toBeFalse();
  });
});
