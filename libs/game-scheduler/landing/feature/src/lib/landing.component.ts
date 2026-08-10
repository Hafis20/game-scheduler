import { Component, inject } from '@angular/core';
import { LandingFacade } from '@game-scheduler/landing/data-access';
import { LandingHeroComponent } from '@game-scheduler/landing/ui';

@Component({
  selector: 'game-scheduler-landing',
  imports: [LandingHeroComponent],
  templateUrl: './landing.component.html',
  host: { class: 'block' },
})
export class LandingComponent {
  protected readonly landing = inject(LandingFacade);
}
