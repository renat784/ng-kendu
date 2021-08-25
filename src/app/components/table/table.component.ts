import { EventEmitter, Component, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserDeleteAction } from 'src/app/store/actions/user.actions';
import { RootState } from 'src/app/store/models/user.store.models';
import { userSelector } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Output() updateUser = new EventEmitter<{ user: User; resetForm: boolean }>();
  users: User[] = [];
  resetForm = true;

  constructor(private store: Store<RootState>) {
    store.select(userSelector).subscribe((i) => (this.users = i));
  }

  editUser(data: any) {
    this.resetForm = false;
    this.updateUser.emit({ user: data, resetForm: this.resetForm });
  }

  removeUser(data: any) {
    const user = data;
    this.store.dispatch(new UserDeleteAction(user));
  }
}
