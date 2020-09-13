import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const IMAGE_PATH = './../../../../assets/img/user-default.png';

@Component({
  selector: 'app-contact-side-bar',
  templateUrl: './contact-side-bar.component.html',
  styleUrls: ['./contact-side-bar.component.scss']
})
export class ContactSideBarComponent implements OnInit {
  user = {name:'Roberto Manganelly del Risco', image: undefined }

  contacts = [{name: 'Marco Antonio Espinosa Ramos', image: undefined}, {name: 'Alicia', image: undefined}, 
  {name: 'Pipo el mejor de todos los mejores', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined},
  {name: 'Pipo', image: undefined}];
  pickedContact = this.contacts[0];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  setImage(element): void{
        element.image = element.image === undefined ? IMAGE_PATH : element.image;

  }
  
  searchContacts(): void{
    alert('not found any....');
  }
  
  clickButton(data: string): void{
    alert(data);
  }
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.contacts.forEach(item => this.setImage(item)
    );
    this.setImage(this.user);

  }
}
