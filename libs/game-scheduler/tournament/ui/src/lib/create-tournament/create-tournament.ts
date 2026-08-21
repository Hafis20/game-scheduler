import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import {
  ModalComponent,
  ButtonComponent,
  Input,
} from '@game-scheduler/shared/ui';

interface ICreateTournament {
  tournamentName: string;
}
@Component({
  selector: 'lib-create-tournament',
  imports: [ModalComponent, ButtonComponent, Input, FormField],
  templateUrl: './create-tournament.html',
})
export class CreateTournament {
  protected readonly createTournamentModel = signal<ICreateTournament>({
    tournamentName: '',
  });

  protected createTournamentForm = form(this.createTournamentModel);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.createTournamentModel());
    return;
  }
}
