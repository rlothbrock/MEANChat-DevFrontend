import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TypingComponent } from './typing/typing.component';
import { RoomComponent } from './room-component/room/room.component';
import { PortalComponent } from './auth-components/portal/portal.component';
import { LoginComponent } from './auth-components/login/login.component';
import { RecoveryComponent } from './auth-components/recovery/recovery.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { ContactSideBarComponent } from './room-component/contact-side-bar/contact-side-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SetTokenInterceptor } from './services/set.token.interceptor';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { UserResolverService } from './services/user-resolver.service';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/portal/signin',
    pathMatch: 'full'
  },
  {
    path: 'portal',
    component: PortalComponent,
    children: [
      {path: '', redirectTo: '/portal/signin', pathMatch: 'full'},
      {path: 'signin', component: LoginComponent},
      {path: 'signup', component: RegisterComponent},
      {path: 'assistance', component: RecoveryComponent}
    ]
  },
  {
    path: 'users/:id/chats',
    component: ContactSideBarComponent,
    canDeactivate: [CanDeactivateGuardService],
    canActivate: [ AuthGuardService ],
    resolve: {
      currentUser: UserResolverService },
    data: {
      defaultAvatar: '../assets/img/user-default.png'
    }
  },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found'},
];


@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    TypingComponent,
    LoginComponent,
    PortalComponent,
    RegisterComponent,
    RecoveryComponent,
    ContactSideBarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: SetTokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
