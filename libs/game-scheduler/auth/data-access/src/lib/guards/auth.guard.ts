import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth';

export const authGuard: CanActivateFn = async (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const session = await authService.getSession();

  return session
    ? true
    : router.createUrlTree(['/auth'], {
        queryParams: { returnUrl: state.url },
      });
};
