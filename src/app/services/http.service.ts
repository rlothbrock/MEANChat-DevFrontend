import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const SERVER_URL = 'http://localhost:3000';
const API_VERSION = 'v1';


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

  get(route: string): Observable<object> {
    const url = `${SERVER_URL}/api/${API_VERSION}/${route}`;
    return this.http.get(url, {
        responseType: 'json',
        observe: 'body' });
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
