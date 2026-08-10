import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface FixtureTeamView {
  readonly country: string;
  readonly countryCode: string;
  readonly flag: string;
  readonly owner: string;
}

export interface FixtureView {
  readonly id: number;
  readonly homeTeam: FixtureTeamView;
  readonly awayTeam: FixtureTeamView;
  readonly homeScore: number | null;
  readonly awayScore: number | null;
  readonly status: 'Pending' | 'Completed';
}

export interface MatchRoundView {
  readonly number: number;
  readonly fixtures: readonly FixtureView[];
}

@Component({
  selector: 'game-scheduler-fixture-list',
  imports: [],
  templateUrl: './fixture-list.component.html',
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixtureListComponent {
  readonly round = input.required<MatchRoundView>();
}
