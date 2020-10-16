import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { exhaustMap, map, shareReplay, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CanDeactivateInterface } from 'src/app/models/can-deactivate-interface';
import { LoggedUser } from 'src/app/models/user.interface';
import { ActivatedRoute, Data, Router } from '@angular/router';

@Component({
  selector: 'app-contact-side-bar',
  templateUrl: './contact-side-bar.component.html',
  styleUrls: ['./contact-side-bar.component.scss']
})
export class ContactSideBarComponent implements OnInit, CanDeactivateInterface {
  user: LoggedUser;
  pickedContact: LoggedUser;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  setImage(element: any): void{
        element.photo = element.photo === undefined ? this.activatedRoute.snapshot.data.defaultAvatar : element.photo;

  }

  visitProfile(): void{
    // // console.log(this.user);
    this.router.navigate(['users', this.user._id, 'profile']);
    return;
  }

  visitContactProfile(): void {
    // // console.log(this.pickedContact);
    this.router.navigate(['users', this.user._id, 'contacts', this.pickedContact._id]);
    return;
  }

  searchContacts(): void{
    alert('not found any....');
  }

  clickButton(data: string): void{
    alert(data);
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver) {}

  logout(): void{
    if(confirm('No more chat?...')){
      return this.authService.logOut();
    }
    return;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  pickContact(index?: number): void {
    if (!index){
      this.pickedContact = this.user.contacts[0];
      return;
    }
    this.pickedContact = this.user.contacts[index];
    return;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.user = data.currentUser;
    });
    this.pickContact();
    this.user.contacts.forEach(item => this.setImage(item)
    );
    this.setImage(this.user);

  }
}
