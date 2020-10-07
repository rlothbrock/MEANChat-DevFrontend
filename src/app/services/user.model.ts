import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoggedUser } from '../models/user.interface';


// interface UserResponse {
//   data: {
//     status: string;
//     user: LoggedUser;
//     message: string;
//   };
// }

export class UserModel {
  constructor(
    private _token: string,
    private _tokenExpiration: Date,
    public id: string,
    public email: string,
    public username: string,
    public contacts: [LoggedUser],
    public photo?: string,
  ) { }

  get token(): string{
    if (!!this._tokenExpiration && new Date() < this._tokenExpiration){
      return this._token;
    }
    return null;
  }
}
