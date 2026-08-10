import { inject, Service } from '@angular/core';
import {
  AuthChangeEvent,
  Session,
  Subscription,
  User,
} from '@supabase/supabase-js';
import { SupabaseService } from '@game-scheduler/supabase';

export type AuthStateChangeCallback = (
  event: AuthChangeEvent,
  session: Session | null,
) => void;

@Service()
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);

  async signInWithGoogle() {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithOAuth({ provider: 'google' });

    if (error) {
      throw error;
    }

    return data;
  }

  async getSession(): Promise<Session | null> {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  }

  async getUser(): Promise<User | null> {
    const { data, error } = await this.supabaseService
      .getClient()
      .auth.getUser();

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabaseService.getClient().auth.signOut();

    if (error) {
      throw error;
    }
  }

  onAuthStateChange(callback: AuthStateChangeCallback): Subscription {
    const {
      data: { subscription },
    } = this.supabaseService.getClient().auth.onAuthStateChange(callback);

    return subscription;
  }
}
