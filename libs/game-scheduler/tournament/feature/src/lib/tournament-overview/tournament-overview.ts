import { Component, inject, OnInit, signal } from '@angular/core';
import {
  Tournament,
  TournamentService,
} from '@game-scheduler/tournament/data-access';
import {
  CreateTournament,
  CreateTournamentPayload,
  TournamentList,
} from '@game-scheduler/tournament/ui';

@Component({
  selector: 'lib-tournament-overview',
  imports: [TournamentList, CreateTournament],
  templateUrl: './tournament-overview.html',
})
export class TournamentOverview implements OnInit {
  private readonly tournamentService = inject(TournamentService);

  protected readonly tournaments = signal<readonly Tournament[]>([]);
  protected readonly isLoadingTournaments = signal(true);
  protected readonly loadTournamentsError = signal<string | null>(null);
  protected readonly isTournamentCreating = signal(false);
  protected readonly isTournamentSubmitting = signal(false);
  protected readonly createTournamentError = signal<string | null>(null);

  ngOnInit(): void {
    void this.loadTournaments();
  }

  protected async loadTournaments(): Promise<void> {
    this.isLoadingTournaments.set(true);
    this.loadTournamentsError.set(null);

    try {
      this.tournaments.set(await this.tournamentService.getTournaments());
    } catch (error) {
      this.loadTournamentsError.set(
        this.getErrorMessage(
          error,
          'Unable to load tournaments. Please try again.'
        )
      );
    } finally {
      this.isLoadingTournaments.set(false);
    }
  }

  protected openTournamentCreationPopup(): void {
    this.createTournamentError.set(null);
    this.isTournamentCreating.set(true);
  }

  protected closeTournamentCreationPopup(): void {
    if (this.isTournamentSubmitting()) {
      return;
    }

    this.isTournamentCreating.set(false);
    this.createTournamentError.set(null);
  }

  protected async onTournamentCreated(
    tournament: CreateTournamentPayload
  ): Promise<void> {
    if (this.isTournamentSubmitting()) {
      return;
    }

    this.isTournamentSubmitting.set(true);
    this.createTournamentError.set(null);

    try {
      const createdTournament = await this.tournamentService.createTournament({
        name: tournament.tournamentName,
        game: tournament.game,
        maxPlayerCount: tournament.maxPlayerCount,
        format: tournament.format,
        startDate: tournament.startDate,
      });
      this.tournaments.update((tournaments) => [
        createdTournament,
        ...tournaments,
      ]);
      this.isTournamentCreating.set(false);
    } catch (error) {
      this.createTournamentError.set(
        this.getErrorMessage(
          error,
          'Unable to create the tournament. Please try again.'
        )
      );
    } finally {
      this.isTournamentSubmitting.set(false);
    }
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    console.log(error);
    return error instanceof Error && error.message ? error.message : fallback;
  }
}
