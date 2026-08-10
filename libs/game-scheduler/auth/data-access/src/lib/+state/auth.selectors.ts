import { authFeature } from './auth.reducer';

export const { selectAuthState, selectUser, selectLoading, selectError } =
  authFeature;
