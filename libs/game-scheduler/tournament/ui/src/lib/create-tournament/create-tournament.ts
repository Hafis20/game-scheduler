import { Component, computed, input, output, signal } from '@angular/core';
import {
  form,
  FormField,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import {
  ModalComponent,
  ButtonComponent,
  Dropdown,
  DropdownOption,
  Input,
} from '@game-scheduler/shared/ui';

interface CreateTournamentFormModel {
  tournamentName: string;
  game: string;
  maxPlayerCount: string;
  format: string;
  startDate: string;
}

export interface CreateTournamentPayload {
  tournamentName: string;
  game: string;
  maxPlayerCount: number;
  format: string;
  startDate: string;
}

type TournamentStep = 1 | 2 | 3 | 4;

@Component({
  selector: 'lib-create-tournament',
  imports: [ModalComponent, ButtonComponent, Dropdown, Input, FormField],
  templateUrl: './create-tournament.html',
})
export class CreateTournament {
  readonly closed = output<void>();
  readonly created = output<CreateTournamentPayload>();
  readonly submitting = input(false);
  readonly errorMessage = input<string | null>(null);

  protected readonly currentStep = signal<TournamentStep>(1);
  protected readonly steps = [
    { number: 1, label: 'Identity' },
    { number: 2, label: 'Game' },
    { number: 3, label: 'Rules' },
    { number: 4, label: 'Launch' },
  ] as const;

  protected readonly gameOptions: readonly DropdownOption[] = [
    { label: 'Football', value: 'football' },
    { label: 'Cricket', value: 'cricket' },
    { label: 'Basketball', value: 'basketball' },
    { label: 'Badminton', value: 'badminton' },
    { label: 'Chess', value: 'chess' },
    { label: 'Esports', value: 'esports' },
  ];

  protected readonly formatOptions: readonly DropdownOption[] = [
    { label: 'Round Robin', value: 'round-robin' },
    { label: 'Single Elimination', value: 'single-elimination' },
    { label: 'Double Elimination', value: 'double-elimination' },
  ];

  protected readonly minimumStartDate = this.toLocalDateInputValue(new Date());

  protected readonly createTournamentModel = signal<CreateTournamentFormModel>({
    tournamentName: '',
    game: '',
    maxPlayerCount: '',
    format: '',
    startDate: '',
  });

  protected readonly createTournamentForm = form(
    this.createTournamentModel,
    (tournament) => {
      required(tournament.tournamentName);
      minLength(tournament.tournamentName, 3);
      validate(tournament.tournamentName, ({ value }) =>
        value().trim().length >= 3
          ? undefined
          : {
              kind: 'tournamentName',
              message: 'Enter at least 3 characters.',
            }
      );
      required(tournament.game);
      required(tournament.maxPlayerCount);
      validate(tournament.maxPlayerCount, ({ value }) => {
        if (!value()) {
          return undefined;
        }

        const playerCount = Number(value());
        return Number.isInteger(playerCount) &&
          playerCount >= 2 &&
          playerCount <= 256
          ? undefined
          : {
              kind: 'maxPlayerCount',
              message: 'Enter a whole number between 2 and 256.',
            };
      });
      required(tournament.format);
      required(tournament.startDate);
      validate(tournament.startDate, ({ value }) =>
        !value() || value() >= this.minimumStartDate
          ? undefined
          : {
              kind: 'startDate',
              message: 'Choose today or a future date.',
            }
      );
    }
  );

  protected readonly selectedGameLabel = computed(
    () =>
      this.gameOptions.find(
        (option) => option.value === this.createTournamentModel().game
      )?.label ?? 'Not selected'
  );

  protected readonly selectedFormatLabel = computed(
    () =>
      this.formatOptions.find(
        (option) => option.value === this.createTournamentModel().format
      )?.label ?? 'Not selected'
  );

  protected readonly canContinue = computed(() => {
    switch (this.currentStep()) {
      case 1:
        return this.createTournamentForm.tournamentName().valid();
      case 2:
        return this.createTournamentForm.game().valid();
      case 3:
        return (
          this.createTournamentForm.maxPlayerCount().valid() &&
          this.createTournamentForm.format().valid()
        );
      case 4:
        return this.createTournamentForm.startDate().valid();
    }
  });

  protected nextStep(): void {
    if (this.submitting() || !this.canContinue() || this.currentStep() === 4) {
      return;
    }

    this.currentStep.update((step) => (step + 1) as TournamentStep);
  }

  protected previousStep(): void {
    if (this.submitting() || this.currentStep() === 1) {
      return;
    }

    this.currentStep.update((step) => (step - 1) as TournamentStep);
  }

  protected progressClasses(step: TournamentStep): string {
    return step <= this.currentStep()
      ? 'h-1.5 rounded-full bg-green-500 transition-colors'
      : 'h-1.5 rounded-full bg-gray-200 transition-colors';
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    if (this.submitting() || this.currentStep() !== 4 || !this.canContinue()) {
      return;
    }

    const tournament = this.createTournamentModel();
    this.created.emit({
      ...tournament,
      maxPlayerCount: Number(tournament.maxPlayerCount),
    });
  }

  private toLocalDateInputValue(date: Date): string {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60_000)
      .toISOString()
      .slice(0, 10);
  }
}
