import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpResponse } from '@angular/common/http';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { LoggedUser } from '../models/user.interface';
import { Router } from '@angular/router';
import { ApiResponse, PasswordUpdateData, UserData } from '../models/various.models';
import { USER_DATA } from 'src/assets/paths';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;

  constructor(private httpService: HttpService, private router: Router) { }

  setUserData(token: string): void {
    // console.log('ejecutando setUserData');
    this.httpService.getUserWithToken(token).subscribe(
        (response: ApiResponse ) => {
          this._setUserDataLocally(token, response.data.data);
        },
        (error) => {alert(error.error.message); },
        () => {
          // console.log('evento completado, llamando autologout desde subscripcion de setUserData')
          this.autoLogOut();
          }
      );
  }

  _setUserDataLocally(token: string, data: UserData): void {
    // console.log('data recibida: ', data);
    const {
      tokenExpiration ,
      _id,
      email,
      username,
      contacts,
      photo } = data;
    const user = new UserModel(
      token,
      tokenExpiration,
      _id,
      email,
      username,
      contacts,
      photo);
    this.userSubject.next(user);
    // console.log('user creado: ', user);
    localStorage.setItem(USER_DATA, JSON.stringify(user));


  }

  getUserData(): UserModel | null {
    // console.log('ejecutando getUserData');
    const user =  JSON.parse(localStorage.getItem(USER_DATA));
    // console.log('user desde getUserData: ', user);
    if (!user){ return null; }
    const { _token, _tokenExpiration, _id, email, username, contacts, photo } = user;
    return new UserModel(_token, _tokenExpiration, _id, email, username, contacts, photo);
  }

  login(email: string, password: string): Observable<object> {
    // console.log('ejecutando login')
    // return this.http.post('portal/login', { email, password } ).pipe(
    //   tap( {next: (res: {token: string}) => this.getUserData(res.token) } )
    // );
    return this.httpService.login(email, password).pipe(
      tap(
        (response: {token: string}) => {
          // console.log('llamando setUserData desde login con token:', response.token);
          this.setUserData(response.token); }
      )
    );
  }

  autoLogin(): void {
    // console.log('llamando autologin')
    const userData: UserData = JSON.parse(localStorage.getItem(USER_DATA));
    // console.log('userData dentro de autologin: ', userData);
    if (!userData){
      // console.log('retornando sin efectos desde autologin')
      return; }
    // console.log('localStorage contiene userData, procede a crear UserModel');
    const loadedUser = new UserModel(
      userData._token,
      userData._tokenExpiration,
      userData._id,
      userData.email,
      userData.username,
      userData.contacts,
      userData.photo);
    // console.log('creada instancia de loadedUser en autologin:', loadedUser);
    // console.log('token:', loadedUser.token);
    if (loadedUser.token){
      // console.log('emitiendo loadedUser');
      this.userSubject.next(loadedUser);
      // console.log('navegando hacia chats: ', loadedUser.token);
      this.router.navigate(['users', loadedUser._id, 'chats']);
      // console.log('llamando autoLogout desde autoLogin');
      this.autoLogOut();
      return;

    }
    return this.logOut();
  }

  logOut(): void{
    // console.log('ejecutando  authservice.logout');
    this.userSubject.next(null);
    localStorage.removeItem(USER_DATA);
    // console.log('userData removido y emitido null:', localStorage.getItem(USER_DATA));
    // console.log('navegando hacia portal')
    this.router.navigate(['portal', 'signin']);
    // console.log('userData luego de navegar:', localStorage.getItem(USER_DATA));
    if (this.tokenExpirationTimer) {
      // console.log('rama this.tokenExpiration', this.tokenExpirationTimer, ' clear');
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogOut(): void {
    // console.log('ejecutando autologout');
    const countdown = 1000 * 60 * 60 * 4; // four hours
    this.tokenExpirationTimer = setTimeout(
      () => {
        // console.log('tiempo expirado, logging out')
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
    return this.httpService.signup(username, email, password).pipe(
      tap(
        (response: {token: string}) => {
          // console.log('llamando setUserData desde signup con token:', response.token);
          this.setUserData(response.token)}
      )
    );
  }

  updatePassword(passwordData: PasswordUpdateData): Observable<object>{
    return this.httpService.updatePassword(passwordData).pipe(
      tap( (response: { token: string}) => {
        // console.log('llamando setUserData desde update password con token:', response.token)
        this.setUserData(response.token)} )
    );

  }
}
