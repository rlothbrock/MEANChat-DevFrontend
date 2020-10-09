import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/user.interface';
import { API_VERSION, SERVER_URL } from './../../assets/paths';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<LoggedUser> {
  botContact: LoggedUser = {
    username: 'ChatBot',
    email: 'noreply@bot.com',
    _id: '1'
  }
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
    if(user.contacts.length === 0 ){
      user.contacts[0] = this.botContact;
    }
    user.contacts.forEach(contact => {
      if (contact.photo){
        contact.photo = `${SERVER_URL}/${contact.photo}`;
      }
    });

    return user;
  }
}
