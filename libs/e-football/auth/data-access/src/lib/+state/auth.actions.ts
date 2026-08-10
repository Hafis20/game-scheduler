import { createAction, props } from '@ngrx/store';
import { User } from '@supabase/supabase-js';

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User | null }>(),
);
export const loadUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{ error: string }>(),
);
export const signInWithGoogle = createAction('[Auth] Sign In With Google');
export const signOut = createAction('[Auth] Sign Out');
export const signOutSuccess = createAction('[Auth] Sign Out Success');
