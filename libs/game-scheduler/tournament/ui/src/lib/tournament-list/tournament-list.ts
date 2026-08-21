import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@game-scheduler/shared/ui';
import { CreateTournament } from '../create-tournament/create-tournament';

@Component({
  selector: 'lib-tournament-list',
  templateUrl: './tournament-list.html',
  imports: [ButtonComponent, CreateTournament],
})
export class TournamentList {
  readonly isTournamentCreating = signal(true);

  protected toggleTournamentCreationPopup() {
    this.isTournamentCreating.set(!this.isTournamentCreating());
  }
}
