import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonComponent } from '@game-scheduler/shared/ui';

@Component({
  selector: 'game-scheduler-landing-hero',
  imports: [ButtonComponent],
  templateUrl: './landing-hero.component.html',
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeroComponent {
  readonly title = input.required<string>();
  readonly venue = input.required<string>();
}
