import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
// import { LoggedUser } from '../models/user.interface';
import { UserModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
// import { buildAssetsUrl } from '../shared/assets.builder';
import { PassField, PassMatchDirective } from '../shared/pass-match.directive';
import { /*RequiredConditional, */RequiredConditionalDirective } from '../shared/required-conditional.directive';
import { ApiResponse, PasswordUpdateData, ProfileUpdateData } from './../models/various.models';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: UserModel;
  editable = false;
  passwordEditable = false;
  savingChanges = false;
  hidePass = true;
  photoChanged = false;
  photoPackage: FormData = null;

  profileForm = this.fb.group({
    username: [
      null,
      Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(3),
        Validators.pattern(/^\S+$/)
      ])
    ],
    photo: null,
    email: [null, Validators.email],
    currentPassword: [
      null,
      Validators.compose([
        Validators.minLength(8),
        RequiredConditionalDirective.bind(this)
      ])
    ],
    password: [
      null,
      Validators.compose([
        Validators.minLength(8),
        RequiredConditionalDirective.bind(this)
      ])
    ],
    repeat: [
      null,
      Validators.compose([
        Validators.minLength(8),
        RequiredConditionalDirective.bind(this),
        PassField
      ])
    ],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
    ) {}

  changePhoto(target: HTMLInputElement): void{
    // console.log('target-files\n:', target.files);
    const profileImage: File = target.files[0];
    console.log('profileImage: ', profileImage);
    return this._changePhoto(profileImage);
  }

  _changePhoto(file: File): void {
    this.photoChanged = true;
    const formData = new FormData();
    formData.append('file', file);
    // formData.append('name', fileName);
    this.photoPackage = formData;
    console.log('foto pachage:',this.photoPackage);
    return;

  }
  changePassword(): void {
    if (this.passwordEditable){
      this.profileForm.controls.currentPassword.reset();
      this.profileForm.controls.password.reset();
      this.profileForm.controls.repeat.reset();
    }
    this.passwordEditable = !this.passwordEditable;
    return;
  }
  editProfile(): void {
    if (this.editable){
      this.profileForm.reset();
    }
    this.editable = !this.editable;
    return;
  }
  goToChats(): void {
    if (this.profileForm.touched){
      if (!confirm('Any unsaved change will be lost. Leave the profile?') ) { return; }
    }
    this.router.navigate(['users', this.user._id, 'chats']);
    return;
  }

  onSubmit(): void {
    if (this.profileForm.pristine && !this.photoChanged){
      return alert('Can\'t submit an empty form');
    }
    switch (this.passwordEditable) {
      case true:
        if (!this.profileForm.valid){
          return alert('invalid Data, can\'t submit.');
        }
        else{ return this._onSubmit(); }
      default:
        if(!this.profileForm.controls.username.valid || !this.profileForm.controls.email.valid){
          return alert('invalid username or email, can\'t submit.');
        }
        return this._onSubmit();
    }
  }

  private _onSubmit(): void {
    if (this.passwordEditable){
      const passwordData: PasswordUpdateData = {
        oldPassword: this.profileForm.controls.currentPassword.value,
        updatedPassword: this.profileForm.controls.repeat.value
      };
      this.httpService.updatePassword(passwordData).subscribe(
        (response: ApiResponse ) => {
          // (response: ApiResponse ) => {
          // this.authService.getUserData();
          alert('password successfully changed');
         },
        (error: any) => {
          // // console.log(error);
          this.savingChanges = false;
          alert(`Upss!! Password edition failed:${'\n'}${error.error.message}`);
        },
        () => { this.savingChanges = false; }
        );
      }
    if (!!this.profileForm.controls.email.value) {return alert('email change not yet implemented'); }
    this.savingChanges = true;
    const userInfo: ProfileUpdateData = {
      username: this.profileForm.controls.username.value,
     // photo: this.profileForm.controls.photo.value
    };
    if (this.photoChanged){
      console.log('rama foto changed evaluada de true en el metodo onSubmit')
      // userInfo.photo = this.photoPackage.get('name').toString();
      // console.log('valor de userInfo.photo', userInfo.photo);
      this.httpService.updateProfile(this.photoPackage).subscribe(
        (_) => { 
          alert('photo successfully saved');
          const {token} = this.authService.getUserData();
          this.authService.setUserData(token);
        },
        ( error: HttpErrorResponse ) => { alert(`error on saving photo ${error.error.message}`); },
        () => {
          this.savingChanges = false;
          console.log('photo upload completed');
      });
    }
    if (!this.profileForm.pristine){

      this.httpService.updateProfile(userInfo).pipe(
        tap(
          ( _ /*response: ApiResponse*/ ) => {
            const {token} = this.authService.getUserData();
            // this.authService._setUserDataLocally(token, response.data.data);
            this.authService.setUserData(token);
      }
    )).subscribe(
      (_) => {
        alert( 'User Information successfully updated' );
        this.user = this.authService.getUserData();
      },
      (error: any) => {
        this.savingChanges = false;
        alert(`Upss!! Password edition failed:${'\n'}${error.error.message}`);
      },
      () => {
        this.savingChanges = false;
      }
      );
    }
    this.profileForm.reset();
    this.photoChanged = false;
    this.savingChanges = false;
    return;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: Data) => { this.user = data.currentUser; } 
      );
  }
}
