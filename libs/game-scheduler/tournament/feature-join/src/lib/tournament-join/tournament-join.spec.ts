import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { TournamentJoinComponent } from './tournament-join';

describe('TournamentJoinComponent', () => {
  const parameters = new BehaviorSubject<ParamMap>(convertToParamMap({}));
  let component: TournamentJoinComponent;
  let fixture: ComponentFixture<TournamentJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentJoinComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: parameters.asObservable() },
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
    parameters.next(convertToParamMap({ token: 'invite-123' }));
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '#tournament-token'
    ) as HTMLInputElement;

    expect(input.value).toBe('invite-123');
  });
});
