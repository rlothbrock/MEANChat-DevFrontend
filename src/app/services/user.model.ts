import { LoggedUser } from '../models/user.interface';
export class UserModel {
  constructor(
    private _token: string,
    private _tokenExpiration: Date,
    public _id: string,
    public email: string,
    public username: string,
    public contacts: [LoggedUser] | [],
    public photo?: string,
  ) { }

  get token(): string{
    if (!!this._tokenExpiration && (new Date(Date.now()) < new Date(this._tokenExpiration) ) ){
      console.log('retornando el token');
      return this._token;
    }
    console.log('retornando null');
    return null;
  }
}
