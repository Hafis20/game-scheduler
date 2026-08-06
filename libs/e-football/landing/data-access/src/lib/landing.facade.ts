import { Injectable, signal } from '@angular/core';
import {
  TOURNAMENT_TEAMS,
  TournamentTeam,
} from '@game-scheduler/e-football/shared/data-access';

export interface KnockoutSlot {
  readonly seed: number;
  readonly label: string;
}

export interface KnockoutMatch {
  readonly id: number;
  readonly label: string;
  readonly slots: readonly KnockoutSlot[];
}

@Injectable({ providedIn: 'root' })
export class LandingFacade {
  readonly heroTitle = signal('PLAY. SCHEDULE. CONQUER.');
  readonly venueName = signal('CNM Pantry International Multi Match Stadium');

  readonly teams = signal<readonly TournamentTeam[]>(TOURNAMENT_TEAMS);

  readonly knockoutSemiFinals = signal<readonly KnockoutMatch[]>([
    {
      id: 1,
      label: 'Semi-final 01',
      slots: [
        { seed: 1, label: '1st place' },
        { seed: 4, label: '4th place' },
      ],
    },
    {
      id: 2,
      label: 'Semi-final 02',
      slots: [
        { seed: 2, label: '2nd place' },
        { seed: 3, label: '3rd place' },
      ],
    },
  ]);
}
