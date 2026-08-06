import { computed, Injectable, signal } from '@angular/core';
import {
  TOURNAMENT_TEAMS,
  TournamentTeam,
} from '@game-scheduler/e-football/shared/data-access';

export interface MatchFixture {
  readonly id: number;
  readonly round: number;
  readonly homeTeamId: number;
  readonly awayTeamId: number;
  readonly homeScore: number | null;
  readonly awayScore: number | null;
}

export interface MatchDetail extends MatchFixture {
  readonly homeTeam: TournamentTeam;
  readonly awayTeam: TournamentTeam;
  readonly status: 'Pending' | 'Completed';
}

export interface MatchRound {
  readonly number: number;
  readonly fixtures: readonly MatchDetail[];
}

export interface StandingRow {
  readonly position: number;
  readonly team: TournamentTeam;
  readonly played: number;
  readonly won: number;
  readonly drawn: number;
  readonly lost: number;
  readonly goalsFor: number;
  readonly goalsAgainst: number;
  readonly goalDifference: number;
  readonly points: number;
}

interface MutableStanding extends Omit<StandingRow, 'position'> {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

const INITIAL_FIXTURES: readonly MatchFixture[] = [
  { id: 1, round: 1, homeTeamId: 1, awayTeamId: 8, homeScore: 1, awayScore: 3 },
  { id: 2, round: 1, homeTeamId: 2, awayTeamId: 7, homeScore: 0, awayScore: 1 },
  { id: 3, round: 1, homeTeamId: 3, awayTeamId: 6, homeScore: 8, awayScore: 0 },
  { id: 4, round: 1, homeTeamId: 4, awayTeamId: 5, homeScore: 4, awayScore: 1 },
  { id: 5, round: 2, homeTeamId: 1, awayTeamId: 7, homeScore: null, awayScore: null },
  { id: 6, round: 2, homeTeamId: 8, awayTeamId: 6, homeScore: null, awayScore: null },
  { id: 7, round: 2, homeTeamId: 2, awayTeamId: 5, homeScore: null, awayScore: null },
  { id: 8, round: 2, homeTeamId: 3, awayTeamId: 4, homeScore: null, awayScore: null },
  { id: 9, round: 3, homeTeamId: 1, awayTeamId: 6, homeScore: null, awayScore: null },
  { id: 10, round: 3, homeTeamId: 7, awayTeamId: 5, homeScore: null, awayScore: null },
  { id: 11, round: 3, homeTeamId: 8, awayTeamId: 4, homeScore: null, awayScore: null },
  { id: 12, round: 3, homeTeamId: 2, awayTeamId: 3, homeScore: null, awayScore: null },
];

@Injectable({ providedIn: 'root' })
export class MatchCenterFacade {
  readonly fixtures = signal<readonly MatchFixture[]>(INITIAL_FIXTURES);
  readonly completedFixtureCount = computed(
    () =>
      this.fixtures().filter(
        (fixture) =>
          fixture.homeScore !== null && fixture.awayScore !== null
      ).length
  );

  readonly rounds = computed<readonly MatchRound[]>(() =>
    [1, 2, 3].map((roundNumber) => ({
      number: roundNumber,
      fixtures: this.fixtures()
        .filter((fixture) => fixture.round === roundNumber)
        .map((fixture) => this.toMatchDetail(fixture)),
    }))
  );

  readonly standings = computed<readonly StandingRow[]>(() => {
    const rows = new Map<number, MutableStanding>(
      TOURNAMENT_TEAMS.map((team) => [
        team.id,
        {
          team,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        },
      ])
    );

    for (const fixture of this.fixtures()) {
      if (fixture.homeScore === null || fixture.awayScore === null) {
        continue;
      }

      const home = rows.get(fixture.homeTeamId);
      const away = rows.get(fixture.awayTeamId);

      if (!home || !away) {
        continue;
      }

      home.played += 1;
      away.played += 1;
      home.goalsFor += fixture.homeScore;
      home.goalsAgainst += fixture.awayScore;
      away.goalsFor += fixture.awayScore;
      away.goalsAgainst += fixture.homeScore;

      if (fixture.homeScore > fixture.awayScore) {
        home.won += 1;
        home.points += 3;
        away.lost += 1;
      } else if (fixture.homeScore < fixture.awayScore) {
        away.won += 1;
        away.points += 3;
        home.lost += 1;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }
    }

    return [...rows.values()]
      .map((row) => ({
        ...row,
        goalDifference: row.goalsFor - row.goalsAgainst,
      }))
      .sort(
        (a, b) =>
          b.points - a.points ||
          b.goalDifference - a.goalDifference ||
          b.goalsFor - a.goalsFor ||
          a.team.id - b.team.id
      )
      .map((row, index) => ({ ...row, position: index + 1 }));
  });

  private toMatchDetail(fixture: MatchFixture): MatchDetail {
    return {
      ...fixture,
      homeTeam: this.findTeam(fixture.homeTeamId),
      awayTeam: this.findTeam(fixture.awayTeamId),
      status:
        fixture.homeScore === null || fixture.awayScore === null
          ? 'Pending'
          : 'Completed',
    };
  }

  private findTeam(teamId: number): TournamentTeam {
    const team = TOURNAMENT_TEAMS.find((candidate) => candidate.id === teamId);

    if (!team) {
      throw new Error(`Unknown tournament team: ${teamId}`);
    }

    return team;
  }
}
