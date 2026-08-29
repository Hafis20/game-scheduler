// admin.routes.ts

import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('@game-scheduler/admin/feature-shell').then(
        (m) => m.AdminShellComponent
      ),
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('@game-scheduler/admin/feature-users').then(
            (m) => m.AdminUsersComponent
          ),
      },
    ],
  },
];
