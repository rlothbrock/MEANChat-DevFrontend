import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree |
    Promise<boolean | UrlTree> | Observable< boolean | UrlTree> {
      return this.auth.userSubject.pipe(
        take(1),
        map((user: UserModel) => {
          if (!!user) {
            return true; }
          return this.router.createUrlTree(['portal', 'signin']);
        })
      );
  }

}
