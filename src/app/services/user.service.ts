import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { find, map, take, takeWhile } from 'rxjs/operators';
import { User } from '../models/user.model';
import { RootState } from '../store/models/user.store.models';
import { userSelector } from '../store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private store: Store<RootState>) {}

  getUsers$() {
    return this.store.select(userSelector);
  }
}
