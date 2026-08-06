import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'e-football-landing-hero',
  imports: [],
  templateUrl: './landing-hero.component.html',
  styleUrl: './landing-hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingHeroComponent {
  readonly title = input.required<string>();
}
