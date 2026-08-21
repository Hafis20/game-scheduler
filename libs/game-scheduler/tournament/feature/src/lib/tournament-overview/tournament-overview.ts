import { Component } from '@angular/core';
import { TournamentList } from '@game-scheduler/tournament/ui';

@Component({
  selector: 'lib-tournament-overview',
  imports: [TournamentList],
  templateUrl: './tournament-overview.html',
})
export class TournamentOverview {}
