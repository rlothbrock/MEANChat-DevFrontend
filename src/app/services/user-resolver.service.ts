import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/user.interface';
import { UserModel } from '../models/user.model';
// import { UserData } from '../models/various.models';
import { API_VERSION, SERVER_URL } from './../../assets/paths';
import { AuthService } from './auth.service';
import { buildAssetsUrl } from '../shared/assets.builder';
@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<UserModel> {
  private botContact: LoggedUser = {
    username: 'ChatBot',
    email: 'noreply@bot.com',
    _id: '1'
  };
  constructor(private authService: AuthService) { }

  resolve(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
    ): Observable<UserModel> | Promise<UserModel> | UserModel {
      // console.log('llamando user resolve');
      // console.log('llamando GET UserData desde el resolve');
      const user: UserModel =  this.authService.getUserData();
      if (user.photo){
        user.photo = buildAssetsUrl(user.photo);
      }
      if (user.contacts.length === 0 ){
        user.contacts.push(this.botContact);
      }
      user.contacts.forEach(contact => {
        if (contact.photo){
          contact.photo = buildAssetsUrl(contact.photo);
        }
      });

      return user;
  }
}
