import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatchCenterFacade } from '@game-scheduler/e-football/match-center/data-access';
import {
  FixtureListComponent,
  StandingsTableComponent,
} from '@game-scheduler/e-football/match-center/ui';
import { NavbarComponent } from '@game-scheduler/e-football/shared/ui';

@Component({
  selector: 'e-football-match-center',
  imports: [
    FixtureListComponent,
    NavbarComponent,
    RouterLink,
    StandingsTableComponent,
  ],
  templateUrl: './match-center.component.html',
  host: { class: 'block' },
})
export class MatchCenterComponent {
  protected readonly matchCenter = inject(MatchCenterFacade);
  protected readonly selectedRoundNumber = signal(1);
  protected readonly selectedRound = computed(() =>
    this.matchCenter
      .rounds()
      .find((round) => round.number === this.selectedRoundNumber())
  );

  protected selectRound(roundNumber: number): void {
    this.selectedRoundNumber.set(roundNumber);
  }
}
