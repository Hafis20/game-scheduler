import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard';

describe('Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to tournaments', () => {
    fixture.detectChanges();

    const tournamentLink = fixture.nativeElement.querySelector(
      'a'
    ) as HTMLAnchorElement;
    expect(tournamentLink.getAttribute('href')).toBe('/tournament');
    expect(tournamentLink.textContent).toContain('Tournaments');
  });
});
