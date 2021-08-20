import {
  EventEmitter,
  Component,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';
import { Gender } from 'src/app/models/gender.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {
  UserCreateAction,
  UserUpdateAction,
} from 'src/app/store/actions/user.actions';
import { RootState } from 'src/app/store/models/user.store.models';
import { userSelector } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() opened: boolean = false;
  @Output() close = new EventEmitter<string>();
  @Input() userToEdit = null;
  updateUser = false;
  oldUserName = '';
  users$: Observable<User[]>;

  listOfGenders: Gender[] = [
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' },
  ];

  listOfCourses: Course[] = [
    { text: 'Backend', value: 'backend' },
    { text: 'Frontend', value: 'frontend' },
    { text: 'Design', value: 'design' },
    { text: 'Project Management', value: 'projectManagement' },
    { text: 'Quality Assurance', value: 'qualityAssurance' },
    { text: 'Business Analytic', value: 'businessAnalytic' },
  ];

  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private store: Store<RootState>,
    private service: UserService
  ) {
    this.form = builder.group({
      name: [
        '',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(15),
          Validators.required,
        ]),
      ],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      course: ['', Validators.required],
      learningStartDate: ['', Validators.required],
      learningEndDate: [''],
    });

    this.users$ = store.select(userSelector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userToEdit && changes.userToEdit.currentValue) {
      const user = changes.userToEdit.currentValue;
      this.oldUserName = user.name;

      this.form.controls['name'].setValue(user.name);
      this.form.controls['birthday'].setValue(new Date(user.birthday));
      this.form.controls['learningStartDate'].setValue(
        new Date(user.learningStartDate)
      );

      if (user.learningEndDate)
        this.form.controls['learningEndDate'].setValue(
          new Date(user.learningEndDate)
        );

      this.form.controls['gender'].setValue([
        this.listOfGenders.find((i) => i.text == user.gender),
      ]);

      this.form.controls['course'].setValue([
        this.listOfCourses.find((i) => i.text == user.course),
      ]);

      this.updateUser = true;
    }
  }

  hasErrors(controlName: string) {
    return (
      this.form.controls[controlName].invalid &&
      (this.form.controls[controlName].dirty ||
        this.form.controls[controlName].touched)
    );
  }

  submit() {
    const name = this.form.controls['name'].value;
    const gender = this.form.controls['gender'].value[0].text;
    const birthday = this.form.controls['birthday'].value;
    const course = this.form.controls['course'].value[0].text;
    const learningStartDate = this.form.controls['learningStartDate'].value;
    const learningEndDate = this.form.controls['learningEndDate'].value;

    const user = {
      name,
      gender,
      birthday,
      course,
      learningStartDate,
      learningEndDate,
    };

    if (this.updateUser) {
      this.store.dispatch(new UserUpdateAction(user, this.oldUserName));
    } else {
      this.store.dispatch(new UserCreateAction(user));
    }

    this.modalClosed('add');
    this.form.reset();
    this.updateUser = false;
  }

  modalClosed(data: string) {
    this.close.emit(data);
    this.form.reset();
  }
}
