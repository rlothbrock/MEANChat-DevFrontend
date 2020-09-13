import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PassField, PassMatchDirective } from './pass-match.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hidePass = true;
  hideRepeat = true;

  registerForm = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])
    ],
    repeat: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        PassField
      ])
    ],
  }
  // , { validators : PassMatchDirective}
  );
  constructor(private fb: FormBuilder, /* private router: Router */) { }
  
  onSubmit(): void {
    if (!this.registerForm.valid){
      alert('can\'t submit an empty form');
    }else{
      alert('done');
    }

  }

  onAbandon(): void {
    if (this.registerForm.touched){
      if ( confirm('Do you really want to abandon this page? Any unsaved change will be lost')){
        //this.router.navigate(['/portal/login']);
      }else{
        return;
      }
    }else{
      //this.router.navigate(['/portal/login']);
    }
  }

  ngOnInit(): void {
  }

}
