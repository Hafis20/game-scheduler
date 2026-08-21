import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournamentList } from './tournament-list';

describe('TournamentList', () => {
  let component: TournamentList;
  let fixture: ComponentFixture<TournamentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentList],
    }).compileComponents();

    fixture = TestBed.createComponent(TournamentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request tournament creation', () => {
    const createRequested = vi.fn();
    component.createRequested.subscribe(createRequested);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    button.click();

    expect(createRequested).toHaveBeenCalledOnce();
  });

  it('should display tournaments in a table', () => {
    fixture.componentRef.setInput('tournaments', [
      {
        id: 'tournament-1',
        name: 'Friday Night Champions',
        game: 'football',
        maxPlayerCount: 16,
        format: 'round-robin',
        status: 'DRAFT',
        startDate: '2099-01-01T00:00:00+00:00',
      },
    ]);
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector(
      'table'
    ) as HTMLTableElement;
    expect(table.textContent).toContain('Friday Night Champions');
    expect(table.textContent).toContain('Round Robin');
    expect(table.textContent).toContain('Draft');
  });

  it('should request a retry after a loading error', () => {
    const retryRequested = vi.fn();
    component.retryRequested.subscribe(retryRequested);
    fixture.componentRef.setInput(
      'errorMessage',
      'Unable to load tournaments.'
    );
    fixture.detectChanges();

    const retryButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button')
    ).find((button) => button.textContent?.includes('Try again'));
    retryButton?.click();

    expect(retryRequested).toHaveBeenCalledOnce();
  });
});
