import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customValidator(): ValidatorFn {
  return (form: any): ValidationErrors | null => {
    const nameControl: FormControl = form.get('name');
    const birthdayControl: FormControl = form.get('birthday');
    const genderControl: FormControl = form.get('gender');
    const courseControl = form.get('course');
    const learningStartDateControl: FormControl = form.get('learningStartDate');
    const learningEndDateControl: FormControl = form.get('learningEndDate');

    const name: string = nameControl.value;

    const nameError = name?.length < 5 || name?.length > 15 || !name;

    if (nameError) {
      nameControl.setErrors({ nameError: true });
    } else {
      nameControl.setErrors(null);
    }

    const birthday: string = birthdayControl.value;
    const learningStart: string = learningStartDateControl.value;
    const learningEnd: string = learningEndDateControl.value;

    let course = null;
    if (courseControl.value) course = courseControl.value[0];

    const courseError = !course || courseControl.value?.length > 1;

    if (courseError) {
      courseControl.setErrors({ courseError: true });
    } else {
      courseControl.setErrors(null);
    }

    let birthdayError = false;

    if (course && learningStart) {
      if (course && (course.value == 'backend' || course.value == 'frontend')) {
        birthdayError = new Date(birthday) >= new Date(learningStart);
      } else {
        birthdayError =
          new Date(birthday) >= new Date(learningStart) ||
          new Date(birthday) >= new Date(learningEnd);
      }
    }

    if (birthdayError) {
      birthdayControl.setErrors({ birthdayError: true });
    } else {
      birthdayControl.setErrors(null);
    }

    let gender = null;
    if (genderControl.value) gender = genderControl.value[0];

    const genderError = !gender || genderControl.value?.length > 1;

    if (genderError) {
      genderControl.setErrors({ genderError: true });
    } else {
      genderControl.setErrors(null);
    }

    let learningStartDateError = false;

    if (course && (course.value == 'backend' || course.value == 'frontend')) {
      learningStartDateError =
        new Date(learningStart) <= new Date(birthday) || learningStart == '';
    } else {
      learningStartDateError =
        new Date(learningStart) <= new Date(birthday) ||
        new Date(learningStart) >= new Date(learningEnd) ||
        learningStart == '';
    }

    if (learningStartDateError) {
      learningStartDateControl.setErrors({ learningStartDateError: true });
    } else {
      learningStartDateControl.setErrors(null);
    }

    let learningEndDateError = false;

    if (course && (course.value == 'backend' || course.value == 'frontend')) {
      learningEndDateError = false;
    } else {
      learningEndDateError =
        new Date(learningEnd) <= new Date(birthday) ||
        new Date(learningEnd) <= new Date(learningStart) ||
        learningEnd == '';
    }

    if (learningEndDateError) {
      learningEndDateControl.setErrors({ learningEndDateError: true });
    } else {
      learningEndDateControl.setErrors(null);
    }

    if (
      !birthdayError &&
      !nameError &&
      !learningStartDateError &&
      !learningEndDateError
    )
      return null;

    return { formError: true };
  };
}
