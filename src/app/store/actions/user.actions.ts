import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum USER_ACTION_TYPES {
  CREATE_USER = '[user] create user',
  DELETE_USER = '[user] delete user',
  UPDATE_USER = '[user] update user',
}

export class UserCreateAction implements Action {
  readonly type = USER_ACTION_TYPES.CREATE_USER;
  constructor(public payload: User) {}
}

export class UserUpdateAction implements Action {
  readonly type = USER_ACTION_TYPES.UPDATE_USER;
  constructor(public payload: User, public oldName: string) {}
}

export class UserDeleteAction implements Action {
  readonly type = USER_ACTION_TYPES.DELETE_USER;
  constructor(public payload: User) {}
}

export type UserActions =
  | UserCreateAction
  | UserDeleteAction
  | UserUpdateAction;
