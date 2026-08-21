import { Component } from '@angular/core';
import { RoomList } from '@game-scheduler/rooms/ui';

@Component({
  selector: 'lib-room-overview',
  imports: [RoomList],
  templateUrl: './room-overview.html',
})
export class RoomOverview {}
