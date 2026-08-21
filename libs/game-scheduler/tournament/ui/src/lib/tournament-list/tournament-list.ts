import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@game-scheduler/shared/ui';
import {
  CreateTournament,
  CreateTournamentPayload,
} from '../create-tournament/create-tournament';

@Component({
  selector: 'lib-tournament-list',
  templateUrl: './tournament-list.html',
  imports: [ButtonComponent, CreateTournament],
})
export class TournamentList {
  readonly isTournamentCreating = signal(false);

  protected openTournamentCreationPopup(): void {
    this.isTournamentCreating.set(true);
  }

  protected closeTournamentCreationPopup(): void {
    this.isTournamentCreating.set(false);
  }

  protected onTournamentCreated(tournament: CreateTournamentPayload): void {
    console.log('Tournament created', tournament);
    this.closeTournamentCreationPopup();
  }
}
