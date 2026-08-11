import { inject, Service } from '@angular/core';
import { SupabaseService } from '@game-scheduler/supabase';

@Service()
export class DashboardService {
  private readonly supabase = inject(SupabaseService);

  async getGameRooms() {
    const { data, error } = await this.supabase
      .getClient()
      .from('game_rooms')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }
}
