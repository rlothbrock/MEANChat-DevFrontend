import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { SERVER_URL , API_VERSION } from './../../assets/paths';
import { PasswordUpdateData, ProfileUpdateData } from './../models/various.models';
import { tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getUserWithToken(token: string): Observable<object>{
    // console.log('el token provisto en getUserWithToken es: ', token );
    const url = `${SERVER_URL}/api/${API_VERSION}/users/Me`;
    return this.http.get(url, {
      responseType: 'json',
      observe: 'body',
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });


  }

  login(email: string, password: string): Observable<object> {
    return this.http.post(
      `${SERVER_URL}/api/${API_VERSION}/portal/login`, { email, password } , {
        responseType: 'json',
        observe: 'body'
      });
  }

  signup(
    username: string,
    email: string,
    password: string): Observable<object> {
      return this.http.post(
      `${SERVER_URL}/api/${API_VERSION}/portal/new-user`,
      {username, email, password}
    ); }

  resetPassword(): void {}

  updatePassword(payload: PasswordUpdateData ): Observable<object> {
    const url = `${SERVER_URL}/api/${API_VERSION}/users/Me/password`;
    return this.http.patch(
      url,
      payload,
      { responseType: 'json', observe: 'body' });
  }

  updateProfile(payload: ProfileUpdateData ): Observable<object>  {
    const url = `${SERVER_URL}/api/${API_VERSION}/users/Me/profile`;
    return this.http.patch(
      url,
      payload,
      { responseType: 'json', observe: 'body'}
    );
  }

  deleteProfile(): Observable<object> {
    const url = `${SERVER_URL}/api/${API_VERSION}/users/Me/profile`;
    return this.http.delete(url)
  }




}
