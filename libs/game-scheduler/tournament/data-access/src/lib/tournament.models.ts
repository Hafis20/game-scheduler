export interface Tournament {
  readonly id: string;
  readonly name: string;
  readonly game: string;
  readonly maxTeamCount: number;
  readonly format: string;
  readonly status: string;
  readonly startDate: string | null;
  readonly description: string | null;
  readonly isPrivate: boolean;
  readonly inviteToken: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateTournamentResult {
  readonly tournament: Tournament;
  readonly invitePath: string;
}

export interface JoinTournamentResult {
  readonly teamId: string;
  readonly tournamentId: string;
  readonly teamName: string;
  readonly alreadyJoined: boolean;
}

export interface TournamentTeam {
  readonly id: string;
  readonly name: string;
  readonly ownerId: string;
  readonly createdAt: string;
}

export interface TournamentDetails {
  readonly tournament: Tournament;
  readonly teams: readonly TournamentTeam[];
}

export interface CreateTournamentInput {
  readonly name: string;
  readonly game: string;
  readonly maxTeamCount: number;
  readonly format: string;
  readonly startDate: string;
  readonly description?: string | null;
  readonly isPrivate?: boolean;
}
