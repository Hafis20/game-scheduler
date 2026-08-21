import { Component, computed, output, signal } from '@angular/core';
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
  imports: [ModalComponent, ButtonComponent, Dropdown, Input],
  templateUrl: './create-tournament.html',
})
export class CreateTournament {
  readonly closed = output<void>();
  readonly created = output<CreateTournamentPayload>();

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
    const tournament = this.createTournamentModel();

    switch (this.currentStep()) {
      case 1:
        return tournament.tournamentName.trim().length >= 3;
      case 2:
        return tournament.game.length > 0;
      case 3: {
        const playerCount = Number(tournament.maxPlayerCount);
        return (
          Number.isInteger(playerCount) &&
          playerCount >= 2 &&
          playerCount <= 256 &&
          tournament.format.length > 0
        );
      }
      case 4:
        return (
          tournament.startDate.length > 0 &&
          tournament.startDate >= this.minimumStartDate
        );
    }
  });

  protected nextStep(): void {
    if (!this.canContinue() || this.currentStep() === 4) {
      return;
    }

    this.currentStep.update((step) => (step + 1) as TournamentStep);
  }

  protected previousStep(): void {
    if (this.currentStep() === 1) {
      return;
    }

    this.currentStep.update((step) => (step - 1) as TournamentStep);
  }

  protected updateField(
    field: keyof CreateTournamentFormModel,
    value: string
  ): void {
    this.createTournamentModel.update((tournament) => ({
      ...tournament,
      [field]: value,
    }));
  }

  protected progressClasses(step: TournamentStep): string {
    return step <= this.currentStep()
      ? 'h-1.5 rounded-full bg-[#7cff4f] transition-colors'
      : 'h-1.5 rounded-full bg-gray-200 transition-colors';
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    if (this.currentStep() !== 4 || !this.canContinue()) {
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
