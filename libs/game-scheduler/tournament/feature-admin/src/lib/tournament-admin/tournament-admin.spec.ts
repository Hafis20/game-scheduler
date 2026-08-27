import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { TournamentService } from '@game-scheduler/tournament/data-access';
import { TournamentAdminComponent } from './tournament-admin';

describe('TournamentAdminComponent', () => {
  const getTournamentDetails = vi.fn();
  let fixture: ComponentFixture<TournamentAdminComponent>;

  beforeEach(async () => {
    getTournamentDetails.mockReset();
    getTournamentDetails.mockResolvedValue({
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
        inviteToken: '7KQ9MX2PDA',
        createdBy: 'user-1',
        createdAt: '2026-08-21T10:00:00+00:00',
        updatedAt: '2026-08-21T10:00:00+00:00',
      },
      teams: [
        {
          id: 'team-1',
          name: 'Hafis',
          ownerId: 'user-2',
          createdAt: '2026-08-27T10:00:00+00:00',
        },
      ],
    });
    await TestBed.configureTestingModule({
      imports: [TournamentAdminComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ id: 'tournament-1' }) },
          },
        },
        {
          provide: TournamentService,
          useValue: { getTournamentDetails },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentAdminComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the tournament and joined teams', () => {
    expect(getTournamentDetails).toHaveBeenCalledWith('tournament-1');
    expect(fixture.nativeElement.textContent).toContain(
      'Friday Night Champions'
    );
    expect(fixture.nativeElement.textContent).toContain('1 of 16 teams joined');
    expect(fixture.nativeElement.textContent).toContain('Hafis');
  });
});
