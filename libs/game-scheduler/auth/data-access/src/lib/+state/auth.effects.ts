import { inject, Service } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../auth';
import * as AuthActions from './auth.actions';
import { catchError, from, map, of, switchMap, tap } from 'rxjs';

@Service()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);

  readonly loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      switchMap(() =>
        from(this.authService.getUser()).pipe(
          map((user) => AuthActions.loadUserSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loadUserFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  readonly signInWithGoogle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInWithGoogle),
        tap(() => this.authService.signInWithGoogle()),
      ),
    { dispatch: false },
  );

  readonly signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() =>
        from(this.authService.signOut()).pipe(
          map(() => AuthActions.signOutSuccess()),
        ),
      ),
    ),
  );
}
