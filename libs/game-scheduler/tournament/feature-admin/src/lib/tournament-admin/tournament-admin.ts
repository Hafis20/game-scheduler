import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  TournamentDetails,
  TournamentService,
} from '@game-scheduler/tournament/data-access';

@Component({
  selector: 'lib-tournament-admin',
  imports: [DatePipe],
  templateUrl: './tournament-admin.html',
})
export class TournamentAdminComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly tournamentService = inject(TournamentService);

  protected readonly details = signal<TournamentDetails | null>(null);
  protected readonly loading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    void this.loadDetails();
  }

  protected async loadDetails(): Promise<void> {
    const tournamentId = this.route.snapshot.paramMap.get('id');

    if (!tournamentId) {
      this.loading.set(false);
      this.errorMessage.set('Tournament not found.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    try {
      this.details.set(
        await this.tournamentService.getTournamentDetails(tournamentId)
      );
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Unable to load tournament details.'
      );
    } finally {
      this.loading.set(false);
    }
  }

  protected displayLabel(value: string): string {
    return value
      .toLowerCase()
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }
}
