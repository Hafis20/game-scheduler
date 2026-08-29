import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAccessService } from '@game-scheduler/admin/data-access';

export const adminGuard: CanActivateFn = async (_route, state) => {
  const adminAccess = inject(AdminAccessService);
  const router = inject(Router);

  try {
    const result = await adminAccess.checkCurrentUserAccess();

    if (result === 'authorized') {
      return true;
    }

    if (result === 'unauthenticated') {
      return router.createUrlTree(['/auth'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return router.createUrlTree(['/dashboard']);
  } catch {
    return router.createUrlTree(['/dashboard']);
  }
};
