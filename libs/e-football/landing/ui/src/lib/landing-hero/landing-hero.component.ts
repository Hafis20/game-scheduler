import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'e-football-landing-hero',
  imports: [],
  templateUrl: './landing-hero.component.html',
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeroComponent {
  readonly title = input.required<string>();
  readonly venue = input.required<string>();
}
