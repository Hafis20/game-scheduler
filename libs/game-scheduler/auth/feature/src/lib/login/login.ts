import { Component, inject } from '@angular/core';
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

  async signIn() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }
}
