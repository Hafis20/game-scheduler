import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTournament } from './create-tournament';

describe('CreateTournament', () => {
  let component: CreateTournament;
  let fixture: ComponentFixture<CreateTournament>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTournament],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTournament);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete all four steps and emit the tournament', async () => {
    const created = vi.fn();
    component.created.subscribe(created);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const setValue = (
      selector: string,
      value: string,
      eventName: 'input' | 'change'
    ) => {
      const control = fixture.nativeElement.querySelector(
        selector
      ) as HTMLInputElement;
      control.value = value;
      control.dispatchEvent(new Event(eventName));
      return fixture.whenStable();
    };

    const settleView = async (work: Promise<unknown>) => {
      await work;
      fixture.detectChanges();
    };

    const clickButton = async (label: string) => {
      const button = Array.from<HTMLButtonElement>(
        fixture.nativeElement.querySelectorAll('button')
      ).find((candidate) => candidate.textContent?.trim() === label);

      expect(button).toBeTruthy();
      expect(button?.disabled).toBe(false);
      button?.click();
      await fixture.whenStable();
      fixture.detectChanges();
    };

    const selectDropdownOption = async (
      triggerSelector: string,
      optionLabel: string
    ) => {
      const trigger = fixture.nativeElement.querySelector(
        triggerSelector
      ) as HTMLButtonElement;
      trigger.click();
      fixture.detectChanges();

      const option = Array.from<HTMLButtonElement>(
        fixture.nativeElement.querySelectorAll('[role="option"]')
      ).find((candidate) => candidate.textContent?.includes(optionLabel));

      expect(option).toBeTruthy();
      option?.click();
      await fixture.whenStable();
      fixture.detectChanges();
    };

    await settleView(
      setValue('input#tournament-name', 'Friday Night Champions', 'input')
    );
    const formModel = Reflect.get(component, 'createTournamentModel') as () => {
      tournamentName: string;
    };
    expect(formModel().tournamentName).toBe('Friday Night Champions');
    await clickButton('Continue');

    await selectDropdownOption('#tournament-game', 'Football');
    await clickButton('Continue');

    await settleView(setValue('input#max-player-count', '16', 'input'));
    await selectDropdownOption('#tournament-format', 'Round Robin');
    await clickButton('Continue');

    await settleView(
      setValue('input#tournament-start-date', '2099-01-01', 'input')
    );
    await clickButton('Create tournament');

    expect(created).toHaveBeenCalledWith({
      tournamentName: 'Friday Night Champions',
      game: 'football',
      maxPlayerCount: 16,
      format: 'round-robin',
      startDate: '2099-01-01',
    });
  });
});
