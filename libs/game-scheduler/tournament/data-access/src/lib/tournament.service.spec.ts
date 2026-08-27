import { TestBed } from '@angular/core/testing';
import { AuthService } from '@game-scheduler/auth/data-access';
import { SupabaseService } from '@game-scheduler/supabase';
import { TournamentService } from './tournament.service';

const tournamentRow = {
  id: 'tournament-1',
  name: 'Friday Night Champions',
  game: 'football',
  max_team_count: 16,
  format: 'round-robin',
  status: 'DRAFT',
  start_date: '2099-01-01T00:00:00+00:00',
  description: null,
  is_private: false,
  invite_token: 'invite-123',
  created_by: 'user-1',
  created_at: '2026-08-21T10:00:00+00:00',
  updated_at: '2026-08-21T10:00:00+00:00',
};

describe('TournamentService', () => {
  const getUser = vi.fn();
  const from = vi.fn();
  const invoke = vi.fn();
  const rpc = vi.fn();

  let service: TournamentService;

  beforeEach(() => {
    getUser.mockReset();
    from.mockReset();
    invoke.mockReset();
    rpc.mockReset();
    getUser.mockResolvedValue({ id: 'user-1' });

    TestBed.configureTestingModule({
      providers: [
        TournamentService,
        {
          provide: AuthService,
          useValue: { getUser },
        },
        {
          provide: SupabaseService,
          useValue: {
            getClient: () => ({ from, rpc, functions: { invoke } }),
          },
        },
      ],
    });

    service = TestBed.inject(TournamentService);
  });

  it('creates a tournament for the authenticated user', async () => {
    invoke.mockResolvedValue({
      data: {
        tournament: tournamentRow,
        invitePath: '/join/invite-123',
      },
      error: null,
    });

    const result = await service.createTournament({
      name: ' Friday Night Champions ',
      game: 'football',
      maxTeamCount: 16,
      format: 'round-robin',
      startDate: '2099-01-01',
    });

    expect(invoke).toHaveBeenCalledWith('create-tournament', {
      body: {
        name: 'Friday Night Champions',
        game: 'football',
        maxTeamCount: 16,
        format: 'round-robin',
        startDate: '2099-01-01',
        description: null,
        isPrivate: false,
      },
    });
    expect(result).toEqual({
      tournament: {
        id: 'tournament-1',
        name: 'Friday Night Champions',
        game: 'football',
        maxTeamCount: 16,
        format: 'round-robin',
        status: 'DRAFT',
        startDate: '2099-01-01T00:00:00+00:00',
        description: null,
        isPrivate: false,
        inviteToken: 'invite-123',
        createdBy: 'user-1',
        createdAt: '2026-08-21T10:00:00+00:00',
        updatedAt: '2026-08-21T10:00:00+00:00',
      },
      invitePath: '/join/invite-123',
    });
  });

  it('loads the authenticated user tournaments newest first', async () => {
    const order = vi.fn().mockResolvedValue({
      data: [tournamentRow],
      error: null,
    });
    const eq = vi.fn().mockReturnValue({ order });
    const select = vi.fn().mockReturnValue({ eq });
    from.mockReturnValue({ select });

    const tournaments = await service.getTournaments();

    expect(eq).toHaveBeenCalledWith('created_by', 'user-1');
    expect(order).toHaveBeenCalledWith('created_at', { ascending: false });
    expect(tournaments).toHaveLength(1);
    expect(tournaments[0]?.name).toBe('Friday Night Champions');
  });

  it('joins a tournament as the authenticated user team', async () => {
    rpc.mockResolvedValue({
      data: [
        {
          team_id: 'team-1',
          tournament_id: 'tournament-1',
          team_name: 'Hafis',
          already_joined: false,
        },
      ],
      error: null,
    });

    const result = await service.joinTournament(' 7kq9mx2pda ');

    expect(rpc).toHaveBeenCalledWith('join_tournament', {
      p_invite_token: '7KQ9MX2PDA',
    });
    expect(result).toEqual({
      teamId: 'team-1',
      tournamentId: 'tournament-1',
      teamName: 'Hafis',
      alreadyJoined: false,
    });
  });

  it('loads tournament details and joined teams for the creator', async () => {
    const tournamentSingle = vi.fn().mockResolvedValue({
      data: tournamentRow,
      error: null,
    });
    const tournamentCreatedBy = vi.fn().mockReturnValue({
      single: tournamentSingle,
    });
    const tournamentId = vi.fn().mockReturnValue({
      eq: tournamentCreatedBy,
    });
    const tournamentSelect = vi.fn().mockReturnValue({ eq: tournamentId });

    const teamOrder = vi.fn().mockResolvedValue({
      data: [
        {
          id: 'team-1',
          name: 'Hafis',
          owner_id: 'user-2',
          created_at: '2026-08-27T10:00:00+00:00',
        },
      ],
      error: null,
    });
    const teamTournament = vi.fn().mockReturnValue({ order: teamOrder });
    const teamSelect = vi.fn().mockReturnValue({ eq: teamTournament });

    from.mockImplementation((table: string) =>
      table === 'tournaments'
        ? { select: tournamentSelect }
        : { select: teamSelect }
    );

    const details = await service.getTournamentDetails('tournament-1');

    expect(tournamentId).toHaveBeenCalledWith('id', 'tournament-1');
    expect(tournamentCreatedBy).toHaveBeenCalledWith('created_by', 'user-1');
    expect(teamTournament).toHaveBeenCalledWith(
      'tournament_id',
      'tournament-1'
    );
    expect(details.teams).toEqual([
      {
        id: 'team-1',
        name: 'Hafis',
        ownerId: 'user-2',
        createdAt: '2026-08-27T10:00:00+00:00',
      },
    ]);
  });

  it('rejects requests without an authenticated user', async () => {
    getUser.mockResolvedValue(null);

    await expect(service.getTournaments()).rejects.toThrow(
      'You must be signed in to manage tournaments.'
    );
    expect(from).not.toHaveBeenCalled();
  });
});
