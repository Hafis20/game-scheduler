import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatchCenterFacade } from '@game-scheduler/match-center/data-access';
import {
  FixtureListComponent,
  StandingsTableComponent,
} from '@game-scheduler/match-center/ui';

@Component({
  selector: 'game-scheduler-match-center',
  imports: [FixtureListComponent, RouterLink, StandingsTableComponent],
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
