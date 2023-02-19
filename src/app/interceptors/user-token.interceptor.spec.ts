import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserTokenInterceptor } from './user-token.interceptor';

describe('UserTokenInterceptor', () => {
  let http: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        UserTokenInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserTokenInterceptor,
          multi: true
        },
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
    localStorage.removeItem('token');
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    const interceptor: UserTokenInterceptor = TestBed.inject(UserTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should append the user token to the Authorization header with a Bearer prefix', () => {
    let userToken = localStorage.getItem('token');
    expect(userToken).toBeNull();

    localStorage.setItem('token', 'fakeTokenValue');
    userToken = localStorage.getItem('token');
    expect(userToken).toBeTruthy();

    http.get('/test').subscribe(() => {
      // Required to trigger the httpTesting.expectOne
    });

    const req = httpTesting.expectOne('/test');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${userToken}`);
    req.flush('HTTP for testing purposes');
  });
});
