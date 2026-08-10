import { Component, inject, Signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthActions, selectUser } from '@game-scheduler/auth/data-access';
import { NavbarComponent } from '@game-scheduler/shared/ui';
import { Store } from '@ngrx/store';
import { User } from '@supabase/supabase-js';

@Component({
  imports: [RouterOutlet, NavbarComponent],
  selector: 'game-scheduler-root',
  template: `
    <game-scheduler-navbar
      brand="GAME SCHEDULER"
      [user]="user()"
      (loginClicked)="login()"
      (signOutClicked)="signOut()"
    />

    <router-outlet />
  `,
  host: { class: 'block min-h-screen' },
})
export class App {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly user: Signal<User | null> = this.store.selectSignal(selectUser);

  constructor() {
    this.store.dispatch(AuthActions.loadUser());
  }

  login(): void {
    this.router.navigate(['/auth']);
  }

  signOut(): void {
    this.store.dispatch(AuthActions.signOut());
  }
}
