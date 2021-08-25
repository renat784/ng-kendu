import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from '@progress/kendo-angular-icons';
import { LabelModule } from '@progress/kendo-angular-label';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { UserReducer } from './store/reducers/user.reducer';
import { RootState } from './store/models/user.store.models';
import { GridModule } from '@progress/kendo-angular-grid';
import { UserService } from './services/user.service';

const reducers = {
  user: UserReducer,
};

@NgModule({
  declarations: [AppComponent, TableComponent, ModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    BrowserAnimationsModule,
    IconsModule,
    LabelModule,
    InputsModule,
    LayoutModule,
    DateInputsModule,
    DropDownsModule,
    DialogsModule,
    StoreModule.forRoot<RootState, any>(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    GridModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
