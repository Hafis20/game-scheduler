import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'lib-tournament-dashboard',
  imports: [TournamentList, CreateTournament],
  templateUrl: './tournament-dashboard.html',
})
export class TournamentDashboard implements OnInit {
  private readonly tournamentService = inject(TournamentService);
  private readonly router = inject(Router);

  protected readonly tournaments = signal<readonly Tournament[]>([]);
  protected readonly isLoadingTournaments = signal(true);
  protected readonly loadTournamentsError = signal<string | null>(null);
  protected readonly isTournamentCreating = signal(false);
  protected readonly isTournamentSubmitting = signal(false);
  protected readonly createTournamentError = signal<string | null>(null);
  protected readonly inviteLink = signal<string | null>(null);
  protected readonly inviteLinkCopied = signal(false);

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
      const result = await this.tournamentService.createTournament({
        name: tournament.tournamentName,
        game: tournament.game,
        maxTeamCount: tournament.maxTeamCount,
        format: tournament.format,
        startDate: tournament.startDate,
      });
      this.tournaments.update((tournaments) => [
        result.tournament,
        ...tournaments,
      ]);
      this.inviteLink.set(
        new URL(result.invitePath, globalThis.location.origin).toString()
      );
      this.inviteLinkCopied.set(false);
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

  protected async copyInviteLink(): Promise<void> {
    const inviteLink = this.inviteLink();

    if (!inviteLink) {
      return;
    }

    await globalThis.navigator.clipboard.writeText(inviteLink);
    this.inviteLinkCopied.set(true);
  }

  protected viewTournamentDetails(id: string): void {
    void this.router.navigate(['/tournament', id]);
  }

  private getErrorMessage(error: unknown, fallback: string): string {
    return error instanceof Error && error.message ? error.message : fallback;
  }
}
