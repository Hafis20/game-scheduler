import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DashboardNavigation {
  id: number;
  title: string;
  desc: string;
  icon: string;
  routerLink: string;
}
@Component({
  selector: 'lib-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  protected readonly dashboardNavigation = signal<DashboardNavigation[]>([
    {
      id: 1,
      title: 'Tournaments',
      desc: 'Create tournaments and view your competition list',
      icon: '',
      routerLink: '/tournament',
    },
    {
      id: 2,
      title: 'Invites',
      desc: 'Create tournaments and view your competition list',
      icon: '',
      routerLink: '',
    },
  ]);
}
