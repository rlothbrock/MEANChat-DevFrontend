import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { SERVER_URL , API_VERSION } from './../../assets/paths';
import { PasswordUpdateData } from './../models/various.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(route: string, payload: any): Observable<object> {
    const url = `${SERVER_URL}/api/${API_VERSION}/${route}`;
    return this.http.post(
      url, payload, {
        responseType: 'json',
        observe: 'body' }).pipe();
  }

  updatePassword(payload: PasswordUpdateData ): Observable<object> {
    const url = `${SERVER_URL}/api/${API_VERSION}/users/Me/password`;
    return this.http.patch(
      url, payload, {
        responseType: 'json',
        observe: 'body' });
  }

  get(route: string): Observable<object> {
    const url = `${SERVER_URL}/api/${API_VERSION}/${route}`;
    return this.http.get(url, {
        responseType: 'json',
        observe: 'body' });
  }

  getUserWithToken(token: string): Observable<object>{
    console.log('el token provisto en getUserWithToken es: ',token );
    const url = `${SERVER_URL}/api/${API_VERSION}/users/Me`;
    return this.http.get(url, {
      responseType: 'json',
      observe: 'body',
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` })
    });


  }

  getWithHeaders(
    route: string,
    headers: {names: [string], values: [string]}
    ): Observable<object>{
    const url = `${SERVER_URL}/api/${API_VERSION}/${route}`;
    const headersObject = Object.create(null);
    headers.names.forEach((name, index) => headersObject[name] = headers.values[index]);
    return this.http.get(url, {
      headers: new HttpHeaders(headersObject),
      responseType: 'json',
      observe: 'body' });
  }
}
