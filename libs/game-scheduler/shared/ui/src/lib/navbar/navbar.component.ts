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
  imports: [ButtonComponent, RouterLink],
  templateUrl: './navbar.component.html',
  host: { class: 'block' },
})
export class NavbarComponent {
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

  protected toggleProfileMenu(): void {
    this.showProfileMenu.set(!this.showProfileMenu());
  }

  protected navigateToDashboard(): void {
    this.showProfileMenu.set(false);
    void this.router.navigate(['/dashboard']);
  }

  protected signOut(): void {
    this.showProfileMenu.set(false);
    this.signOutClicked.emit();
  }

  protected avatarUrl(user: User): string | null {
    const metadata = user.user_metadata;

    return metadata['avatar_url'] ?? metadata['picture'] ?? null;
  }

  protected displayName(user: User): string {
    const name = user.user_metadata['full_name'] ?? user.user_metadata['name'];

    return typeof name === 'string' && name.trim()
      ? name
      : (user.email ?? 'Player');
  }
}
