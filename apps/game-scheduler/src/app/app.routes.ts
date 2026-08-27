import { Route } from '@angular/router';
import { authGuard } from '@game-scheduler/auth/data-access';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@game-scheduler/landing/feature').then(
        (module) => module.LandingComponent
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@game-scheduler/auth/feature').then(
        (module) => module.LoginComponent
      ),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@game-scheduler/dashboard').then(
        (module) => module.DashboardComponent
      ),
  },
  {
    path: 'tournament/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@game-scheduler/tournament/feature-admin').then(
        (module) => module.TournamentAdminComponent
      ),
  },
  {
    path: 'tournament',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@game-scheduler/tournament/feature-dashboard').then(
        (module) => module.TournamentDashboard
      ),
  },
  {
    path: 'join',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@game-scheduler/tournament/feature-join').then(
        (module) => module.TournamentJoinComponent
      ),
  },
  {
    path: 'join/:token',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@game-scheduler/tournament/feature-join').then(
        (module) => module.TournamentJoinComponent
      ),
  },
  {
    path: 'matches',
    loadComponent: () =>
      import('@game-scheduler/match-center/feature').then(
        (module) => module.MatchCenterComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
