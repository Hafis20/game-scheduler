export interface Tournament {
  readonly id: string;
  readonly name: string;
  readonly game: string;
  readonly maxPlayerCount: number;
  readonly format: string;
  readonly status: string;
  readonly startDate: string | null;
  readonly description: string | null;
  readonly isPrivate: boolean;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CreateTournamentInput {
  readonly name: string;
  readonly game: string;
  readonly maxPlayerCount: number;
  readonly format: string;
  readonly startDate: string;
  readonly description?: string | null;
  readonly isPrivate?: boolean;
}
