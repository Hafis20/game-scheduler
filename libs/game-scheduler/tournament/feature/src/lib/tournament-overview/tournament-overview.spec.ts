import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentOverview } from './tournament-overview';

describe('TournamentOverview', () => {
  let component: TournamentOverview;
  let fixture: ComponentFixture<TournamentOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
