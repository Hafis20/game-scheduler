import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthActions } from '@game-scheduler/auth/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  signIn(): void {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
    this.store.dispatch(AuthActions.signInWithGoogle({ returnUrl }));
  }
}
