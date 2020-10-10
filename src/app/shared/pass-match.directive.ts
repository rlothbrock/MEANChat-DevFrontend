import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export const PassMatchDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const repeat = control.get('repeat');
    return (password && repeat) && ( password.value === repeat.value ) ? null : { matchError: true} ;
  };
export const PassField: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  return  PassMatchDirective(control.root);
};

