import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { exhaustMap, map, shareReplay, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CanDeactivateInterface } from 'src/app/models/can-deactivate-interface';
import { LoggedUser } from 'src/app/models/user.interface';
import { ActivatedRoute, Data } from '@angular/router';

// const IMAGE_PATH = './../../../../assets/img/user-default.png';

@Component({
  selector: 'app-contact-side-bar',
  templateUrl: './contact-side-bar.component.html',
  styleUrls: ['./contact-side-bar.component.scss']
})
export class ContactSideBarComponent implements OnInit, CanDeactivateInterface {
  // user = {name:'Roberto Manganelly del Risco', image: undefined }
  user: LoggedUser;
  pickedContact: LoggedUser;
  // contacts = [
  //   {name: 'Marco Antonio Espinosa Ramos', image: undefined},
  //   {name: 'Alicia', image: undefined},
  //   {name: 'Pipo el mejor de todos los mejores', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined},
  //   {name: 'Pipo', image: undefined}
  // ];
  
  // pickedContact = this.user.contacts[0];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  setImage(element: any): void{
        element.photo = element.photo === undefined ? this.activatedRoute.snapshot.data.defaultAvatar : element.photo;

  }

  searchContacts(): void{
    alert('not found any....');
  }

  clickButton(data: string): void{
    alert(data);
  }
  constructor(
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver) {}

  logout(): void{
    this.auth.logOut();
  }
 
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
  // getUser(): void{
  //   this.activatedRoute.snapshot.data.currentUser;
  // }
  
  pickContact(index?: number): void {
    console.log('lanzando pick contact');
    console.log('this user desde pickContact de la barra side: ', this.user);
    if (!index){
      console.log('asignando sin index');
      this.pickedContact = this.user.contacts[0];
      return;
    }
    console.log('asignando index: ', index);
    this.pickedContact = this.user.contacts[index];
    return;
  }

  ngOnInit(): void {
    console.log('lanzando on init');
    // this.getUser();
    this.activatedRoute.snapshot.data.currentUser.su
    this.pickContact();
    this.user.contacts.forEach(item => this.setImage(item)
    );
    this.setImage(this.user);

  }
}
