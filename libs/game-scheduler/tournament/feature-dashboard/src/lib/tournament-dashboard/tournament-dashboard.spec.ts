import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Tournament,
  TournamentService,
} from '@game-scheduler/tournament/data-access';
import { CreateTournamentPayload } from '@game-scheduler/tournament/ui';
import { TournamentDashboard } from './tournament-dashboard';

describe('TournamentDashboard', () => {
  const createTournament = vi.fn();
  const getTournaments = vi.fn();

  const tournament: Tournament = {
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
  };

  let component: TournamentDashboard;
  let fixture: ComponentFixture<TournamentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentDashboard],
      providers: [
        {
          provide: TournamentService,
          useValue: { createTournament, getTournaments },
        },
      ],
    }).compileComponents();

    createTournament.mockReset();
    getTournaments.mockReset();
    createTournament.mockResolvedValue(tournament);
    getTournaments.mockResolvedValue([]);
    fixture = TestBed.createComponent(TournamentDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tournaments when initialized', () => {
    expect(getTournaments).toHaveBeenCalledOnce();
  });

  it('should persist a tournament and close the popup', async () => {
    const payload: CreateTournamentPayload = {
      tournamentName: 'Friday Night Champions',
      game: 'football',
      maxPlayerCount: 16,
      format: 'round-robin',
      startDate: '2099-01-01',
    };
    const openPopup = Reflect.get(
      component,
      'openTournamentCreationPopup'
    ) as () => void;
    const create = Reflect.get(component, 'onTournamentCreated') as (
      tournament: CreateTournamentPayload
    ) => Promise<void>;

    openPopup.call(component);
    await create.call(component, payload);

    expect(createTournament).toHaveBeenCalledWith({
      name: 'Friday Night Champions',
      game: 'football',
      maxPlayerCount: 16,
      format: 'round-robin',
      startDate: '2099-01-01',
    });
    const isCreating = Reflect.get(
      component,
      'isTournamentCreating'
    ) as () => boolean;
    const tournaments = Reflect.get(
      component,
      'tournaments'
    ) as () => readonly Tournament[];
    expect(isCreating()).toBe(false);
    expect(tournaments()).toEqual([tournament]);
  });

  it('should keep the popup open when creation fails', async () => {
    createTournament.mockRejectedValueOnce(new Error('Database unavailable'));
    const openPopup = Reflect.get(
      component,
      'openTournamentCreationPopup'
    ) as () => void;
    const create = Reflect.get(component, 'onTournamentCreated') as (
      tournament: CreateTournamentPayload
    ) => Promise<void>;

    openPopup.call(component);
    await create.call(component, {
      tournamentName: 'Friday Night Champions',
      game: 'football',
      maxPlayerCount: 16,
      format: 'round-robin',
      startDate: '2099-01-01',
    });

    const isCreating = Reflect.get(
      component,
      'isTournamentCreating'
    ) as () => boolean;
    const error = Reflect.get(component, 'createTournamentError') as () =>
      | string
      | null;
    expect(isCreating()).toBe(true);
    expect(error()).toBe('Database unavailable');
  });
});
