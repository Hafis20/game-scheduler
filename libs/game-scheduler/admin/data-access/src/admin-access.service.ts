import { inject, Service } from '@angular/core';
import { AuthService } from '@game-scheduler/auth/data-access';
import { SupabaseService } from '@game-scheduler/supabase';

export type AdminAccessResult = 'authorized' | 'unauthenticated' | 'forbidden';

@Service()
export class AdminAccessService {
  private readonly authService = inject(AuthService);
  private readonly supabase = inject(SupabaseService);

  async checkCurrentUserAccess(): Promise<AdminAccessResult> {
    const session = await this.authService.getSession();

    if (!session) {
      return 'unauthenticated';
    }

    const { data, error } = await this.supabase
      .getClient()
      .from('user_roles')
      .select('role')
      .eq('id', session.user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data?.role === 'admin' ? 'authorized' : 'forbidden';
  }
}
