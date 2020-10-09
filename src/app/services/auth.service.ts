import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from './user.model';
import { tap } from 'rxjs/operators';
import { LoggedUser } from '../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpService, private router: Router) { }

  private  getUserData(token: string): void {
     
    this.http.getWithHeaders(
      'users/Me',
      {names: ['Authorization'], values: [`Bearer ${token}`]} ).subscribe(
        (response: any) => {
          const {
            tokenExpiration,
            _id,
            email,
            username,
            contacts,
            photo } = response.data.data;
          const currentUser = new UserModel(
            token,
            tokenExpiration,
            _id,
            email,
            username,
            contacts,
            photo);
          this.userSubject.next(currentUser);
          localStorage.setItem('userData', JSON.stringify(currentUser));
          this.autoLogOut();
        }
      );
  }


  login(email: string, password: string): Observable<object> {
     
    return this.http.post('portal/login', { email, password } ).pipe(
      tap( {next: (res: {token: string}) => this.getUserData(res.token) } )
    );
  }

  autoLogin(): void {
     
    const userData: {
      username: string;
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: Date;
      contacts: [LoggedUser];
      photo?: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData){ return; }

    const loadedUser = new UserModel(
      userData._token,
      userData._tokenExpiration,
      userData.id,
      userData.email,
      userData.username,
      userData.contacts,
      userData.photo);
     
    if (loadedUser.token){
      this.userSubject.next(loadedUser);
      this.autoLogOut();
    }
  }

  logOut(): void{
     
    this.userSubject.next(null);
    this.router.navigate(['portal', 'signin']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(): void {
    const countdown = 1000 * 60 * 60 * 2; // two hours
    this.tokenExpirationTimer = setTimeout(
      () => {
         
        return this.logOut();
      },
      countdown
    );
  }

  signup(
    username: string,
    email: string,
    password: string
  ): Observable<object> {
    return this.http.post('portal/new-user', { username, email, password } ).pipe(
      tap( {next: (res: {token: string}) => this.getUserData(res.token) } )
    );
  }
}
