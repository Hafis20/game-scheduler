import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@game-scheduler/e-football/landing/feature').then(
        (module) => module.LandingComponent,
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('@game-scheduler/auth/feature').then(
        (module) => module.LoginComponent,
      ),
  },
  {
    path: 'matches',
    loadComponent: () =>
      import('@game-scheduler/e-football/match-center/feature').then(
        (module) => module.MatchCenterComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
