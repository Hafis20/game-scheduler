import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '@game-scheduler/tournament/data-access';
import { ButtonComponent, Input } from '@game-scheduler/shared/ui';

@Component({
  selector: 'lib-tournament-join',
  imports: [Input, ButtonComponent],
  templateUrl: './tournament-join.html',
})
export class TournamentJoinComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly tournamentService = inject(TournamentService);

  protected readonly token = signal('');
  protected readonly joining = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly successMessage = signal<string | null>(null);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((parameters) => {
      this.token.set(parameters.get('token') ?? '');
    });
  }

  protected async joinTournament(): Promise<void> {
    if (this.joining() || !this.token().trim()) {
      return;
    }

    this.joining.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    try {
      const result = await this.tournamentService.joinTournament(this.token());
      this.successMessage.set(
        result.alreadyJoined
          ? `You already joined as ${result.teamName}.`
          : `You joined as ${result.teamName}.`
      );
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error
          ? error.message
          : 'Unable to join this tournament.'
      );
    } finally {
      this.joining.set(false);
    }
  }
}
