import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { AuthService } from '../auth';
import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  const actions = new Subject<ReturnType<typeof AuthActions.signOutSuccess>>();
  const navigate = vi.fn();
  let effects: AuthEffects;

  beforeEach(() => {
    navigate.mockReset();
    navigate.mockResolvedValue(true);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: { navigate } },
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('redirects to auth after sign out succeeds', () => {
    const subscription = effects.redirectAfterSignOut$.subscribe();

    actions.next(AuthActions.signOutSuccess());

    expect(navigate).toHaveBeenCalledWith(['/auth']);
    subscription.unsubscribe();
  });
});
