import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanDeactivateInterface } from './../models/can-deactivate-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanDeactivateInterface> {

  constructor() { }

  canDeactivate(
    component: CanDeactivateInterface,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      return component.canDeactivate();
     }
}
