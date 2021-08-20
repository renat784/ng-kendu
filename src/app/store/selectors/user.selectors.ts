import { createSelector } from '@ngrx/store';
import { RootState } from '../models/user.store.models';

export const userSelector = createSelector(
  (state: RootState) => state.user,
  (user) => user.users
);
