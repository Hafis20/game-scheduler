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
        maxTeamCount: 16,
        format: 'round-robin',
        status: 'DRAFT',
        startDate: '2099-01-01T00:00:00+00:00',
        inviteToken: '7KQ9MX2PDA',
      },
    ]);
    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector(
      'table'
    ) as HTMLTableElement;
    expect(table.textContent).toContain('Friday Night Champions');
    expect(table.textContent).toContain('Round Robin');
    expect(table.textContent).toContain('Draft');
    expect(table.textContent).toContain('Copy invite');
  });

  it('should copy a tournament invite link', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    fixture.componentRef.setInput('tournaments', [
      {
        id: 'tournament-1',
        name: 'Friday Night Champions',
        game: 'football',
        maxTeamCount: 16,
        format: 'round-robin',
        status: 'DRAFT',
        startDate: '2099-01-01T00:00:00+00:00',
        inviteToken: '7KQ9MX2PDA',
      },
    ]);
    fixture.detectChanges();

    const copyButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button')
    ).find((button) => button.textContent?.includes('Copy invite'));
    copyButton?.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(writeText).toHaveBeenCalledWith(
      'http://localhost:3000/join/7KQ9MX2PDA'
    );
    expect(copyButton?.textContent).toContain('Copied');
  });

  it('should request tournament details', () => {
    const detailsRequested = vi.fn();
    component.detailsRequested.subscribe(detailsRequested);
    fixture.componentRef.setInput('tournaments', [
      {
        id: 'tournament-1',
        name: 'Friday Night Champions',
        game: 'football',
        maxTeamCount: 16,
        format: 'round-robin',
        status: 'DRAFT',
        startDate: null,
        inviteToken: '7KQ9MX2PDA',
      },
    ]);
    fixture.detectChanges();

    const detailsButton = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('button')
    ).find((button) => button.textContent?.trim() === 'Details');
    detailsButton?.click();

    expect(detailsRequested).toHaveBeenCalledWith('tournament-1');
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
