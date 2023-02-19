import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageService } from '../message/message.service';
import { UserService } from './user.service';

class MessageServiceStub {
  setMessage = () => { };
};

describe('UserService', () => {
  let service: UserService;
  let http: HttpTestingController;
  let router: Router;
  let messageService: MessageService;
  const serverURL = 'server/user';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: MessageService, useClass: MessageServiceStub }
      ]
    });
    service = TestBed.inject(UserService);
    http = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    messageService = TestBed.inject(MessageService);
    service.userUrl = serverURL;
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#userRegister should send a request to the server', () => {
    const exampleData = {
      email: 'example@mail',
      username: 'exampleuname',
      password: '123123',
      repassword: '123123'
    };

    service.userRegister(exampleData).subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(exampleData);
    });

    const req = http.expectOne(`${serverURL}/register`);
    expect(req.request.method).toBe('POST');
    req.flush(exampleData);
  });

  it('#userLogin should send a request to the server', () => {
    const exampleData = {
      username: 'exampleuname',
      password: '123123',
    };

    service.userLogin('exampleuname', '123123').subscribe(postData => {
      const postDataReturned: any = postData;
      expect(postDataReturned).toEqual(exampleData);
    });

    const req = http.expectOne(`${serverURL}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(exampleData);
  });

  it('#userLogout should remove the localStorage token, redirect the user and show a success message', () => {
    const setUserStatusSpy = jasmine.createSpy('setUserStatus');
    service.setUserStatus = setUserStatusSpy;
    const navigateSpy = spyOn(router, 'navigate');
    const messageSpy = spyOn(messageService, 'setMessage');
    let localStorageToken = null;

    localStorage.setItem('token', 'fakeTokenValue');
    localStorageToken = localStorage.getItem('token');
    expect(localStorageToken).toBeTruthy();

    // Call the function
    service.userLogout();

    // Test if the token was removed
    localStorageToken = localStorage.getItem('token');
    expect(localStorageToken).toBeNull();
    
    // Test if the setUserStatus was called
    expect(setUserStatusSpy).toHaveBeenCalled();

    // Test if the router navigation was called with login
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);

    // Test if a status message was added
    expect(messageSpy).toHaveBeenCalledWith({ type: 'message-success', message: 'Successfully logged out.' });
  });

  it('#setUserStatus should trigger userStatus value change', () => {
    let expectedObservableValue = false;
    let setUserStatusResponse = false;

    expect(localStorage.getItem('token')).toBeNull();

    service.userStatus.subscribe((value) => {
      expect(value).toEqual(expectedObservableValue);
    });

    localStorage.setItem('token', 'fakeTokenValue');
    expectedObservableValue = true;
    setUserStatusResponse = service.setUserStatus();
    expect(setUserStatusResponse).toEqual(expectedObservableValue);

    localStorage.removeItem('token');
    setUserStatusResponse = expectedObservableValue = false;
    setUserStatusResponse = service.setUserStatus();
    expect(setUserStatusResponse).toEqual(expectedObservableValue);
  });
  
  it('#getUserToken should return the token with a string or null based on the localStorage value', () => {
    let localStorageToken = localStorage.getItem('token');
    expect(localStorageToken).toBeNull();
    
    localStorage.setItem('token', 'fakeTokenValue');

    localStorageToken = localStorage.getItem('token');
    expect(localStorageToken).toBeTruthy();

    localStorage.removeItem('token');
    localStorageToken = localStorage.getItem('token');
    expect(localStorageToken).toBeNull();
  });
});
