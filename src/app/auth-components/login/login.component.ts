import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { UserModel } from 'src/app/services/user.model';
// import { LoggedUser } from '../../models/user.interface';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: UserModel;
  requesting = false;
  retryLogin = false;
  hidePass = true;

  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([ Validators.required, Validators.minLength(8)])]
  });

  constructor(
    private auth: AuthService,
    private http: HttpService,
    private fb: FormBuilder,
    private router: Router) {}

  onSubmit(): void {
    this.retryLogin = false;
    if (!this.loginForm.valid){
      return alert( 'Invalid Form! Check your input');
    }
    this.requesting = true;
    this.auth.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value,
    ).subscribe(
      (res: { token: string; status: string; } ) => {
        alert('login succesfully');
        this.requesting = false;

      },
      (err: HttpResponse<object>) => {
        this.requesting = false;
        this.retryLogin = true;
        return alert('login failed');
       }
    );
    this.loginForm.reset();
  }

  ngOnInit(): void {
    this.auth.userSubject.subscribe(
      user => {
        console.log('user emitido: ', user);
        if (!!user){
        return this.router.navigate(['users', user.id, 'chats']);
        }
      }
    )
  }
  ngOnDestroy(): void {
    //this.auth.userSubject.unsubscribe();
  }
}

