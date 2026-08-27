import { inject, Service } from '@angular/core';
import { AuthService } from '@game-scheduler/auth/data-access';
import { SupabaseService } from '@game-scheduler/supabase';
import {
  CreateTournamentInput,
  CreateTournamentResult,
  JoinTournamentResult,
  Tournament,
  TournamentDetails,
  TournamentTeam,
} from './tournament.models';

interface TournamentRow {
  readonly id: string;
  readonly name: string;
  readonly game: string;
  readonly max_team_count: number;
  readonly format: string;
  readonly status: string;
  readonly start_date: string | null;
  readonly description: string | null;
  readonly is_private: boolean;
  readonly invite_token: string;
  readonly created_by: string;
  readonly created_at: string;
  readonly updated_at: string;
}

const TOURNAMENT_COLUMNS =
  'id, name, game, max_team_count, format, status, start_date, description, is_private, invite_token, created_by, created_at, updated_at';

interface CreateTournamentFunctionResponse {
  readonly tournament: TournamentRow;
  readonly invitePath: string;
}

interface JoinTournamentRow {
  readonly team_id: string;
  readonly tournament_id: string;
  readonly team_name: string;
  readonly already_joined: boolean;
}

interface TournamentTeamRow {
  readonly id: string;
  readonly name: string;
  readonly owner_id: string;
  readonly created_at: string;
}

@Service()
export class TournamentService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  async createTournament(
    input: CreateTournamentInput
  ): Promise<CreateTournamentResult> {
    await this.requireUser();

    const { data, error } = await this.supabaseService
      .getClient()
      .functions.invoke<CreateTournamentFunctionResponse>('create-tournament', {
        body: {
          name: input.name.trim(),
          game: input.game,
          maxTeamCount: input.maxTeamCount,
          format: input.format,
          startDate: input.startDate,
          description: input.description?.trim() || null,
          isPrivate: input.isPrivate ?? false,
        },
      });

    if (error || !data) {
      throw error ?? new Error('The tournament function returned no data.');
    }

    return {
      tournament: this.toTournament(data.tournament),
      invitePath: data.invitePath,
    };
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

  async joinTournament(token: string): Promise<JoinTournamentResult> {
    await this.requireUser();

    const { data, error } = await this.supabaseService
      .getClient()
      .rpc('join_tournament', {
        p_invite_token: token.trim().toUpperCase(),
      });

    if (error) {
      throw error;
    }

    const team = (data as JoinTournamentRow[] | null)?.[0];

    if (!team) {
      throw new Error('Unable to join this tournament.');
    }

    return {
      teamId: team.team_id,
      tournamentId: team.tournament_id,
      teamName: team.team_name,
      alreadyJoined: team.already_joined,
    };
  }

  async getTournamentDetails(id: string): Promise<TournamentDetails> {
    const user = await this.requireUser();
    const client = this.supabaseService.getClient();
    const { data: tournament, error: tournamentError } = await client
      .from('tournaments')
      .select(TOURNAMENT_COLUMNS)
      .eq('id', id)
      .eq('created_by', user.id)
      .single();

    if (tournamentError) {
      throw tournamentError;
    }

    const { data: teams, error: teamsError } = await client
      .from('tournament_teams')
      .select('id, name, owner_id, created_at')
      .eq('tournament_id', id)
      .order('created_at', { ascending: true });

    if (teamsError) {
      throw teamsError;
    }

    return {
      tournament: this.toTournament(tournament as TournamentRow),
      teams: (teams as TournamentTeamRow[]).map(
        (team): TournamentTeam => ({
          id: team.id,
          name: team.name,
          ownerId: team.owner_id,
          createdAt: team.created_at,
        })
      ),
    };
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
      maxTeamCount: row.max_team_count,
      format: row.format,
      status: row.status,
      startDate: row.start_date,
      description: row.description,
      isPrivate: row.is_private,
      inviteToken: row.invite_token,
      createdBy: row.created_by,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
