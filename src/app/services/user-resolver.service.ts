import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<LoggedUser> {

  constructor() { }

  resolve( 
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
    ): Observable<LoggedUser> | Promise<LoggedUser> | LoggedUser {
    return JSON.parse(localStorage.getItem('userData'));
  }
}
