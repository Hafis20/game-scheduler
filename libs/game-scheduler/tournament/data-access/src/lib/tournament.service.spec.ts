import { TestBed } from '@angular/core/testing';
import { AuthService } from '@game-scheduler/auth/data-access';
import { SupabaseService } from '@game-scheduler/supabase';
import { TournamentService } from './tournament.service';

const tournamentRow = {
  id: 'tournament-1',
  name: 'Friday Night Champions',
  game: 'football',
  max_player_count: 16,
  format: 'round-robin',
  status: 'DRAFT',
  start_date: '2099-01-01T00:00:00+00:00',
  description: null,
  is_private: false,
  created_by: 'user-1',
  created_at: '2026-08-21T10:00:00+00:00',
  updated_at: '2026-08-21T10:00:00+00:00',
};

describe('TournamentService', () => {
  const getUser = vi.fn();
  const from = vi.fn();

  let service: TournamentService;

  beforeEach(() => {
    getUser.mockReset();
    from.mockReset();
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
          useValue: { getClient: () => ({ from }) },
        },
      ],
    });

    service = TestBed.inject(TournamentService);
  });

  it('creates a tournament for the authenticated user', async () => {
    const single = vi.fn().mockResolvedValue({
      data: tournamentRow,
      error: null,
    });
    const select = vi.fn().mockReturnValue({ single });
    const insert = vi.fn().mockReturnValue({ select });
    from.mockReturnValue({ insert });

    const tournament = await service.createTournament({
      name: ' Friday Night Champions ',
      game: 'football',
      maxPlayerCount: 16,
      format: 'round-robin',
      startDate: '2099-01-01',
    });

    expect(from).toHaveBeenCalledWith('tournaments');
    expect(insert).toHaveBeenCalledWith({
      name: 'Friday Night Champions',
      game: 'football',
      max_player_count: 16,
      format: 'round-robin',
      start_date: '2099-01-01',
      description: null,
      is_private: false,
      created_by: 'user-1',
    });
    expect(tournament).toEqual({
      id: 'tournament-1',
      name: 'Friday Night Champions',
      game: 'football',
      maxPlayerCount: 16,
      format: 'round-robin',
      status: 'DRAFT',
      startDate: '2099-01-01T00:00:00+00:00',
      description: null,
      isPrivate: false,
      createdBy: 'user-1',
      createdAt: '2026-08-21T10:00:00+00:00',
      updatedAt: '2026-08-21T10:00:00+00:00',
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

  it('rejects requests without an authenticated user', async () => {
    getUser.mockResolvedValue(null);

    await expect(service.getTournaments()).rejects.toThrow(
      'You must be signed in to manage tournaments.'
    );
    expect(from).not.toHaveBeenCalled();
  });
});
