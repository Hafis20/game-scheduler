import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentAdminComponent } from './tournament-admin';

describe('TournamentAdminComponent', () => {
  let fixture: ComponentFixture<TournamentAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentAdminComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
