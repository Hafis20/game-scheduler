import { withSupabase } from '@supabase/server';

export default {
  fetch: withSupabase({ auth: ['publishable', 'secret'] }, async (req, ctx) => {
    // const { name } = await req.json();

    return Response.json({
      message: `Hello !`,
    });
  }),
};
