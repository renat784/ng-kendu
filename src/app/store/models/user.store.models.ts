import { User } from 'src/app/models/user.model';

export interface RootState {
  user: UserState;
}

export interface UserState {
  users: User[];
}
