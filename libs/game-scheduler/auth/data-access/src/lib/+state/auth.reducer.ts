import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '@supabase/supabase-js';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.loadUser, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(AuthActions.loadUserSuccess, (state, { user }) => ({
      ...state,
      user,
      loading: false,
    })),

    on(AuthActions.loadUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(AuthActions.signOutSuccess, (state) => ({
      ...state,
      user: null,
    })),
  ),
});
