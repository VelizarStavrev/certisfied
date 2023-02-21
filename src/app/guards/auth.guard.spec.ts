import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    guard = TestBed.inject(AuthGuard);
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('#canActivate should return true if a token is present', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    let canActivateReturnValue: boolean;

    canActivateReturnValue = guard.canActivate(route, state) as boolean;
    expect(canActivateReturnValue).toBeFalse();

    localStorage.setItem('token', 'fakeTokenValue');
    canActivateReturnValue = guard.canActivate(route, state) as boolean;
    expect(canActivateReturnValue).toBeTrue();
  });
});
