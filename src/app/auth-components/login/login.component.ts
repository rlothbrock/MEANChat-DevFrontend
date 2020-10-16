import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { HttpService } from 'src/app/services/http.service';
import { UserModel } from 'src/app/models/user.model';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
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
  subscription: Subscription;

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
    ).pipe(tap(
      (response: { token: string; status: string; } ) => {
        this.auth.setUserData(response.token);
      })
    ).subscribe(
      (_) => {
        alert('login succesfully');
        this.loginForm.reset();
        this.requesting = false;
        this.subscription = this.auth.userSubject.subscribe(
          user => {
            if (!!user){
            return this.router.navigate(['users', user._id, 'chats']);
            }
          }
        );
      },
      (err: HttpResponse<object>) => {
        this.requesting = false;
        this.retryLogin = true;
        this.loginForm.reset();
        return alert('login failed');

      },
      () => {
        // console.log('login completed');
      }
    );
  }

  ngOnInit(): void {
    if (!!this.auth.getUserData()){
      this.auth.autoLogin();
    }
  }
  ngOnDestroy(): void {
    if (!!this.subscription){
      this.subscription.unsubscribe();
    }
  }
}

