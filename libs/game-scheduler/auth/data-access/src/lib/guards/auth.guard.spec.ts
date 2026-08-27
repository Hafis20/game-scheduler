import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../auth';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const getSession = vi.fn();
  const createUrlTree = vi.fn();

  beforeEach(() => {
    getSession.mockReset();
    createUrlTree.mockReset();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { getSession } },
        { provide: Router, useValue: { createUrlTree } },
      ],
    });
  });

  it('allows authenticated users to open an invite', async () => {
    getSession.mockResolvedValue({ access_token: 'token' });

    const result = await runGuard('/join/7KQ9MX2PDA');

    expect(result).toBe(true);
  });

  it('redirects guests to auth and preserves the invite URL', async () => {
    const authUrlTree = { redirect: 'auth' };
    getSession.mockResolvedValue(null);
    createUrlTree.mockReturnValue(authUrlTree);

    const result = await runGuard('/join/7KQ9MX2PDA');

    expect(createUrlTree).toHaveBeenCalledWith(['/auth'], {
      queryParams: { returnUrl: '/join/7KQ9MX2PDA' },
    });
    expect(result).toBe(authUrlTree);
  });

  function runGuard(url: string) {
    return TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, { url } as RouterStateSnapshot)
    );
  }
});
