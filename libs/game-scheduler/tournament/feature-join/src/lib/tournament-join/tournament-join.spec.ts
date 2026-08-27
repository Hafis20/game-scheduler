import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { TournamentService } from '@game-scheduler/tournament/data-access';
import { BehaviorSubject } from 'rxjs';
import { TournamentJoinComponent } from './tournament-join';

describe('TournamentJoinComponent', () => {
  const parameters = new BehaviorSubject<ParamMap>(convertToParamMap({}));
  const joinTournament = vi.fn();
  let component: TournamentJoinComponent;
  let fixture: ComponentFixture<TournamentJoinComponent>;

  beforeEach(async () => {
    joinTournament.mockReset();
    joinTournament.mockResolvedValue({
      teamId: 'team-1',
      tournamentId: 'tournament-1',
      teamName: 'Hafis',
      alreadyJoined: false,
    });
    await TestBed.configureTestingModule({
      imports: [TournamentJoinComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: parameters.asObservable() },
        },
        {
          provide: TournamentService,
          useValue: { joinTournament },
        },
      ],
    }).compileComponents();

    parameters.next(convertToParamMap({}));
    fixture = TestBed.createComponent(TournamentJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should leave the token input empty when the route has no token', () => {
    const input = fixture.nativeElement.querySelector(
      '#tournament-token'
    ) as HTMLInputElement;

    expect(input.value).toBe('');
  });

  it('should fill the token input from the route', () => {
    parameters.next(convertToParamMap({ token: '7KQ9MX2PDA' }));
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '#tournament-token'
    ) as HTMLInputElement;

    expect(input.value).toBe('7KQ9MX2PDA');
  });

  it('should join the tournament as a team', async () => {
    parameters.next(convertToParamMap({ token: '7KQ9MX2PDA' }));
    fixture.detectChanges();

    const joinButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button')
    ).find((button) => button.textContent?.trim() === 'Join');
    joinButton?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(joinTournament).toHaveBeenCalledWith('7KQ9MX2PDA');
    expect(fixture.nativeElement.textContent).toContain('You joined as Hafis.');
  });
});
