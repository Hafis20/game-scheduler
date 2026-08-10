import { Service, signal } from '@angular/core';
import {
  TOURNAMENT_TEAMS,
  TournamentTeam,
} from '@game-scheduler/shared/data-access';

export interface KnockoutSlot {
  readonly seed: number;
  readonly label: string;
}

export interface KnockoutMatch {
  readonly id: number;
  readonly label: string;
  readonly slots: readonly KnockoutSlot[];
}

@Service()
export class LandingFacade {
  readonly heroTitle = signal('SCHEDULE. QUEUE. PLAY.');
  readonly venueName = signal('One command center for every game night');

  readonly teams = signal<readonly TournamentTeam[]>(TOURNAMENT_TEAMS);

  readonly knockoutSemiFinals = signal<readonly KnockoutMatch[]>([
    {
      id: 1,
      label: 'Priority lobby 01',
      slots: [
        { seed: 1, label: 'Host ready' },
        { seed: 4, label: 'Challenger ready' },
      ],
    },
    {
      id: 2,
      label: 'Priority lobby 02',
      slots: [
        { seed: 2, label: 'Squad ready' },
        { seed: 3, label: 'Queue ready' },
      ],
    },
  ]);
}
