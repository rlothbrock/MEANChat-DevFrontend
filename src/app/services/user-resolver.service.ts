import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/user.interface';
import { API_VERSION, SERVER_URL } from './../../assets/paths';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<LoggedUser> {

  constructor() { }

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
    ): Observable<LoggedUser> | Promise<LoggedUser> | LoggedUser {
    const user =  JSON.parse(localStorage.getItem('userData'));
    if (user.photo){
      user.photo = `${SERVER_URL}/${user.photo}`;
      console.log(user.photo);
    }
    user.contacts.forEach(contact => {
      if (contact.photo){
        contact.photo = `${SERVER_URL}/${contact.photo}`;
      };
    });

    return user;
  }
}
