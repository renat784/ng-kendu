import { UserActions, USER_ACTION_TYPES } from '../actions/user.actions';
import { UserState } from '../models/user.store.models';

const init_state: UserState = {
  users: [],
};

export function UserReducer(
  state: UserState = init_state,
  action: UserActions
) {
  switch (action.type) {
    case USER_ACTION_TYPES.CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };

    case USER_ACTION_TYPES.UPDATE_USER:
      let users = state.users.filter((i) => i.name != action.oldName);
      users.push(action.payload);
      return {
        ...state,
        users: users,
      };

    case USER_ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((i) => i.name != action.payload.name),
      };

    default:
      return state;
  }
}
