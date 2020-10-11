import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { LoggedUser } from '../models/user.interface';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { PassField, PassMatchDirective } from '../shared/pass-match.directive';
import { /*RequiredConditional, */RequiredConditionalDirective } from '../shared/required-conditional.directive';
import { PasswordUpdateData } from './../models/various.models';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: LoggedUser;
  editable = false;
  passwordEditable = false;
  savingChanges = false;
  hidePass = true;

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

  changePhoto(): void {
    alert('Thanks! change Photo');
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
    this.savingChanges = true;
    console.log('lanzando onSubmit ');
    if (this.passwordEditable){
      console.log('lanzando rama edit password')
      const passwordData: PasswordUpdateData = {
        oldPassword: this.profileForm.controls.currentPassword.value,
        updatedPassword: this.profileForm.controls.repeat.value
      }
      this.httpService.updatePassword(passwordData).subscribe(
        (response: { token: string } ) => {
          console.log('reponse: ', response );
          console.log('nuevo token recibido: ', response.token );
          this.authService.getUserData(response.token); },
        (error: any) => {
          console.log(error);
          alert(error.error.message);
          this.savingChanges = false;
        },
        () => { this.savingChanges = false; }
      );
    }
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.user = data.currentUser;
    })
  }
}
