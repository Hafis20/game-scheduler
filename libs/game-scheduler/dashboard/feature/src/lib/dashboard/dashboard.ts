import { Component, inject, signal } from '@angular/core';
import { DashboardService } from '@game-scheduler/dashboard/data-access';
@Component({
  selector: 'lib-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  private readonly dashboardService = inject(DashboardService);
  protected gameRoom = signal([]);

  ngOnInit(): void {
    this.dashboardService.getGameRooms().then();
  }
}
