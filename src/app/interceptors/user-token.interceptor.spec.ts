import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserTokenInterceptor } from './user-token.interceptor';

describe('UserTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserTokenInterceptor
    ],
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const interceptor: UserTokenInterceptor = TestBed.inject(UserTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
