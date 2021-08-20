import { Component } from '@angular/core';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public opened = false;
  public user: any;

  public close(status: string) {
    this.opened = false;
  }

  updateUser(user: User) {
    this.opened = true;
    this.user = user;
  }

  public open() {
    this.opened = true;
  }
}
