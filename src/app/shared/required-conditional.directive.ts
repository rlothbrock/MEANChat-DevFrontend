import { FormGroup, ValidationErrors, ValidatorFn // ValidationErrors, FormControl, FormGroup,
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

export const RequiredConditionalDirective: ValidatorFn = function(control: FormGroup): ValidationErrors | null {
  if (this.passwordEditable){
    console.log('detectando requerimiento');
    return Validators.required(control);
  }
  console.log('saliendo con null');
  return null;
}