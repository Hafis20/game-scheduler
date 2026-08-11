import {
  Component,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '@supabase/supabase-js';
import { ButtonComponent } from '../button/button';
@Component({
  selector: 'game-scheduler-navbar',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './navbar.component.html',
  host: { class: 'block' },
})
export class NavbarComponent {
  readonly brand = input('Game Scheduler');
  readonly router = inject(Router);
  readonly isScrolled = signal(false);

  readonly authLoading = input<boolean>(false);
  readonly user = input<User | null>(null);
  readonly loginClicked = output<void>();
  readonly signOutClicked = output<void>();

  protected showProfileMenu = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 0);
  }

  protected toggleProfileMenu() {
    this.showProfileMenu.set(!this.showProfileMenu());
  }

  protected navigateToDashboard() {
    this.toggleProfileMenu();
    this.router.navigate(['/dashboard']);
  }

  protected avatarUrl(user: User): string | null {
    const metadata = user.user_metadata;

    return metadata['avatar_url'] ?? metadata['picture'] ?? null;
  }
}
