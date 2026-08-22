import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideLogIn, LucideTrophy } from '@lucide/angular';

interface DashboardNavigation {
  id: number;
  title: string;
  desc: string;
  icon: string;
  routerLink: string;
}
@Component({
  selector: 'lib-dashboard',
  imports: [RouterLink, LucideLogIn, LucideTrophy],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  protected readonly dashboardNavigation = signal<DashboardNavigation[]>([
    {
      id: 1,
      title: 'My Tournaments',
      desc: 'Create, manage, and track your tournaments',
      icon: 'trophy',
      routerLink: '/tournament',
    },
    {
      id: 2,
      title: 'Join Tournament',
      desc: 'Enter an invite code to join a tournament',
      icon: 'log-in',
      routerLink: '/join',
    },
  ]);
}
