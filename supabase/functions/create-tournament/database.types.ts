export interface Database {
  public: {
    Tables: {
      tournaments: {
        Row: {
          id: string;
          name: string;
          game: string;
          max_team_count: number;
          format: string;
          status: string;
          start_date: string | null;
          description: string | null;
          is_private: boolean;
          invite_token: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          game: string;
          max_team_count: number;
          format: string;
          status?: string;
          start_date?: string | null;
          description?: string | null;
          is_private?: boolean;
          invite_token?: string;
          created_by: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          game?: string;
          max_team_count?: number;
          format?: string;
          status?: string;
          start_date?: string | null;
          description?: string | null;
          is_private?: boolean;
          invite_token?: string;
          created_by?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
