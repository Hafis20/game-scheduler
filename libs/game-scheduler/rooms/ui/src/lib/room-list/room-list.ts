import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@game-scheduler/shared/ui';
import { CreateRoom } from '../create-room/create-room';

@Component({
  selector: 'lib-room-list',
  templateUrl: './room-list.html',
  imports: [ButtonComponent, CreateRoom],
})
export class RoomList {
  readonly isRoomCreating = signal(true);

  protected toggleRoomCreationPopup() {
    this.isRoomCreating.set(!this.isRoomCreating());
  }
}
