import { Component } from '@angular/core';
import { ModalComponent, ButtonComponent } from '@game-scheduler/shared/ui';

@Component({
  selector: 'lib-create-room',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './create-room.html',
})
export class CreateRoom {}
