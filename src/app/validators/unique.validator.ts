import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export function userExistsValidator(service: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return service.getUserByName$(control.value).pipe(
      map((user: User | undefined) => {
        if (user) {
          return { userExists: true };
        }
        return null;
      })
    );
  };
}
