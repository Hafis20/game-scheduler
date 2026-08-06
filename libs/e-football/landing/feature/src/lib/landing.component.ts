import { Component, inject } from '@angular/core';
import { LandingFacade } from '@game-scheduler/e-football/landing/data-access';
import { LandingHeroComponent } from '@game-scheduler/e-football/landing/ui';
import { NavbarComponent } from '@game-scheduler/e-football/shared/ui';

@Component({
  selector: 'e-football-landing',
  imports: [LandingHeroComponent, NavbarComponent],
  templateUrl: './landing.component.html',
  host: { class: 'block' },
})
export class LandingComponent {
  protected readonly landing = inject(LandingFacade);
}
