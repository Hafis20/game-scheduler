import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@game-scheduler/e-football/landing/feature').then(
        (module) => module.LandingComponent
      ),
  },
  {
    path: 'matches',
    loadComponent: () =>
      import('@game-scheduler/e-football/match-center/feature').then(
        (module) => module.MatchCenterComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
