import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface StandingTeamView {
  readonly country: string;
  readonly countryCode: string;
  readonly flag: string;
  readonly owner: string;
}

export interface StandingView {
  readonly position: number;
  readonly team: StandingTeamView;
  readonly played: number;
  readonly won: number;
  readonly drawn: number;
  readonly lost: number;
  readonly goalsFor: number;
  readonly goalsAgainst: number;
  readonly goalDifference: number;
  readonly points: number;
}

@Component({
  selector: 'e-football-standings-table',
  imports: [],
  templateUrl: './standings-table.component.html',
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandingsTableComponent {
  readonly standings = input.required<readonly StandingView[]>();
}
