import { withSupabase } from '@supabase/server';
import type { Database } from './database.types.ts';

const INVITE_TOKEN_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function createInviteToken(length = 10): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));

  return Array.from(
    randomBytes,
    (byte) => INVITE_TOKEN_ALPHABET[byte % INVITE_TOKEN_ALPHABET.length]
  ).join('');
}

interface CreateTournamentRequest {
  readonly name: string;
  readonly game: string;
  readonly maxTeamCount: number;
  readonly format: string;
  readonly startDate: string;
  readonly description?: string | null;
  readonly isPrivate?: boolean;
}

function isCreateTournamentRequest(
  value: unknown
): value is CreateTournamentRequest {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const input = value as Record<string, unknown>;

  return (
    typeof input['name'] === 'string' &&
    input['name'].trim().length >= 3 &&
    typeof input['game'] === 'string' &&
    input['game'].length > 0 &&
    Number.isInteger(input['maxTeamCount']) &&
    Number(input['maxTeamCount']) >= 2 &&
    Number(input['maxTeamCount']) <= 256 &&
    typeof input['format'] === 'string' &&
    input['format'].length > 0 &&
    typeof input['startDate'] === 'string' &&
    !Number.isNaN(Date.parse(input['startDate']))
  );
}

export default {
  fetch: withSupabase<Database>({ auth: 'user' }, async (request, context) => {
    if (request.method !== 'POST') {
      return Response.json({ message: 'Method not allowed.' }, { status: 405 });
    }

    const body: unknown = await request.json().catch(() => null);

    if (!isCreateTournamentRequest(body)) {
      return Response.json(
        { message: 'Invalid tournament details.' },
        { status: 400 }
      );
    }

    const { data, error } = await context.supabase
      .from('tournaments')
      .insert({
        name: body.name.trim(),
        game: body.game,
        max_team_count: body.maxTeamCount,
        format: body.format,
        start_date: body.startDate,
        description: body.description?.trim() || null,
        is_private: body.isPrivate ?? false,
        invite_token: createInviteToken(),
        created_by: context.userClaims!.id,
      })
      .select(
        'id, name, game, max_team_count, format, status, start_date, description, is_private, invite_token, created_by, created_at, updated_at'
      )
      .single();

    if (error || !data) {
      return Response.json(
        { message: error?.message ?? 'Tournament creation returned no data.' },
        { status: 500 }
      );
    }

    return Response.json(
      {
        tournament: data,
        invitePath: `/join/${data.invite_token}`,
      },
      { status: 201 }
    );
  }),
};
