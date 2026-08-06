import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@game-scheduler/e-football/landing/feature').then(
        (module) => module.LandingComponent
      ),
  },
];
