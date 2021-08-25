import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public opened = false;
  public user: any;
  public resetForm = false;

  public close(status: string) {
    this.opened = false;
  }

  updateUser(data: any) {
    this.opened = true;
    this.user = data.user;
    this.resetForm = data.resetForm;
  }

  addUser() {
    this.resetForm = true;
    this.open();
  }

  public open() {
    this.opened = true;
  }
}
