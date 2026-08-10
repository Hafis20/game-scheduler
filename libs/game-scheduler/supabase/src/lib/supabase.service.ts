import { inject, Service } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG, SupabaseConfig } from './supabase.config';

@Service()
export class SupabaseService {
  private readonly config = inject<SupabaseConfig>(SUPABASE_CONFIG);

  private readonly client: SupabaseClient = createClient(
    this.config.url,
    this.config.publishableKey,
  );

  getClient(): SupabaseClient {
    return this.client;
  }
}
