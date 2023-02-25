import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { MessageComponent } from './components/shared/message/message.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoaderComponent,
        MessageComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create the app', () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'certisfied'`, () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component.title).toEqual('certisfied');
  });

  it('should have a header component', () => {
    const element = de.query(By.css('app-header'));
    expect(element).toBeTruthy();
  });

  it('should have a footer component', () => {
    const element = de.query(By.css('app-footer'));
    expect(element).toBeTruthy();
  });

  describe('main component', () => {
    it('should exist', () => {
      const element = de.query(By.css('main'));
      expect(element).toBeTruthy();
    });

    it('should have the loader component', () => {
      const element = de.query(By.css('app-loader'));
      expect(element).toBeTruthy();
    });

    it('should have the message component', () => {
      const element = de.query(By.css('app-message'));
      expect(element).toBeTruthy();
    });

    it('should have the router outlet', () => {
      const element = de.query(By.css('router-outlet'));
      expect(element).toBeTruthy();
    });
  });
});
