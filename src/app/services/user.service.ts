import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RootState } from '../store/models/user.store.models';
import { userSelector } from '../store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store<RootState>) {}

  getUsers$(): Observable<User[]> {
    return this.store.select(userSelector);
  }

  getUserByName$(name: string): Observable<User | undefined> {
    return this.getUsers$().pipe(
      map((users: User[]) => users.find((user) => user.name == name))
    );
  }
}
