import { Component, HostListener, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@supabase/supabase-js';
@Component({
  selector: 'game-scheduler-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  host: { class: 'block' },
})
export class NavbarComponent {
  readonly brand = input('Game Scheduler');
  readonly isScrolled = signal(false);

  readonly user = input<User | null>(null);
  readonly loginClicked = output<void>();
  readonly signOutClicked = output<void>();

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 0);
  }

  protected avatarUrl(user: User): string | null {
    const metadata = user.user_metadata;

    return metadata['avatar_url'] ?? metadata['picture'] ?? null;
  }
}
