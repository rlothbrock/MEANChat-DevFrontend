import { ValidatorFn,// ValidationErrors, FormControl, FormGroup,
} from '@angular/forms';
import {  Validators } from '@angular/forms';

// export const _RequiredConditionalDirective: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
//   const password = control.get('password');
//   const repeat = control.get('repeat');
//   return (password && repeat) && ( password.value === repeat.value ) ? null : { matchError: true} ;
// };
// export const _RequiredConditional: ValidatorFn = (control: FormControl): ValidationErrors | null => {
// return  _RequiredConditionalDirective(control.root);
// };
// // --------------

export const RequiredConditionalDirective: ValidatorFn = function(): ValidatorFn | null {
  if (this.passwordEditable){ return Validators.required;  }
  return null;
}