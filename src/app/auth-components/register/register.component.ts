import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PassField, PassMatchDirective } from './pass-match.directive';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  onRequest =  false;
  errorMessage = '';
  hidePass = true;
  hideRepeat = true;

  registerForm = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.maxLength(100), Validators.pattern(/^\S+$/)])],
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
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpService) { }

  onSubmit(): void {
    if (!this.registerForm.valid){
      alert(`Can't submit the form if empty`);
    }else{
      this.onRequest = true;
      const username = this.registerForm.controls.username.value;
      const email = this.registerForm.controls.email.value;
      const password = this.registerForm.controls.password.value;
      const role = 'user';
      this.auth.signup(username, email, password)
      .subscribe(
        (_) => {
          this.onRequest = false;
          alert(`Account successfully created with email:\n ${email} `);
          return this.router.navigate(['/portal', 'signin']);
        },
        (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.onRequest = false;
          return alert(`Fail when attempting to create a new account:\n${this.errorMessage}`);
        },
        () => console.log('done')
      );
      this.registerForm.reset();
    }

  }

  onAbandon(): void {
    if (this.registerForm.touched){
      if ( confirm('Do you really want to abandon this page? Any unsaved change will be lost')){
        this.router.navigate(['/portal/signin']);
      }else{
        return;
      }
    }else{
      this.router.navigate(['/portal/signin']);
    }
  }

  ngOnInit(): void {
  }

}
