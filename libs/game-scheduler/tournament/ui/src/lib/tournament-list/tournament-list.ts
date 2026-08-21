import { DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '@game-scheduler/shared/ui';

export interface TournamentListItem {
  readonly id: string;
  readonly name: string;
  readonly game: string;
  readonly maxPlayerCount: number;
  readonly format: string;
  readonly status: string;
  readonly startDate: string | null;
}

@Component({
  selector: 'lib-tournament-list',
  templateUrl: './tournament-list.html',
  imports: [ButtonComponent, DatePipe],
})
export class TournamentList {
  readonly tournaments = input<readonly TournamentListItem[]>([]);
  readonly loading = input(false);
  readonly errorMessage = input<string | null>(null);

  readonly createRequested = output<void>();
  readonly retryRequested = output<void>();

  protected displayLabel(value: string): string {
    return value
      .toLowerCase()
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (character: string) => character.toUpperCase());
  }

  protected statusClasses(status: string): string {
    switch (status.toUpperCase()) {
      case 'OPEN':
        return 'bg-green-50 text-green-700';
      case 'IN_PROGRESS':
        return 'bg-blue-50 text-blue-700';
      case 'COMPLETED':
        return 'bg-violet-50 text-violet-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
