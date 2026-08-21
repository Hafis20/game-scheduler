import { inject, Service } from '@angular/core';
import { AuthService } from '@game-scheduler/auth/data-access';
import { SupabaseService } from '@game-scheduler/supabase';
import { CreateTournamentInput, Tournament } from './tournament.models';

interface TournamentRow {
  readonly id: string;
  readonly name: string;
  readonly game: string;
  readonly max_player_count: number;
  readonly format: string;
  readonly status: string;
  readonly start_date: string | null;
  readonly description: string | null;
  readonly is_private: boolean;
  readonly created_by: string;
  readonly created_at: string;
  readonly updated_at: string;
}

interface TournamentInsert {
  readonly name: string;
  readonly game: string;
  readonly max_player_count: number;
  readonly format: string;
  readonly start_date: string;
  readonly description: string | null;
  readonly is_private: boolean;
  readonly created_by: string;
}

const TOURNAMENT_COLUMNS =
  'id, name, game, max_player_count, format, status, start_date, description, is_private, created_by, created_at, updated_at';

@Service()
export class TournamentService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  async createTournament(input: CreateTournamentInput): Promise<Tournament> {
    const user = await this.requireUser();
    const tournament: TournamentInsert = {
      name: input.name.trim(),
      game: input.game,
      max_player_count: input.maxPlayerCount,
      format: input.format,
      start_date: input.startDate,
      description: input.description?.trim() || null,
      is_private: input.isPrivate ?? false,
      created_by: user.id,
    };

    const { data, error } = await this.supabaseService
      .getClient()
      .from('tournaments')
      .insert(tournament)
      .select(TOURNAMENT_COLUMNS)
      .single();

    if (error) {
      throw error;
    }

    return this.toTournament(data as TournamentRow);
  }

  async getTournaments(): Promise<readonly Tournament[]> {
    const user = await this.requireUser();
    const { data, error } = await this.supabaseService
      .getClient()
      .from('tournaments')
      .select(TOURNAMENT_COLUMNS)
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data as TournamentRow[]).map((row) => this.toTournament(row));
  }

  private async requireUser() {
    const user = await this.authService.getUser();

    if (!user) {
      throw new Error('You must be signed in to manage tournaments.');
    }

    return user;
  }

  private toTournament(row: TournamentRow): Tournament {
    return {
      id: row.id,
      name: row.name,
      game: row.game,
      maxPlayerCount: row.max_player_count,
      format: row.format,
      status: row.status,
      startDate: row.start_date,
      description: row.description,
      isPrivate: row.is_private,
      createdBy: row.created_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
