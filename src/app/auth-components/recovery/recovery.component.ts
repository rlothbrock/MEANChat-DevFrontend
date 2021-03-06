import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  submitted = false;
  verifiedEmail: string;
  waitToResendEmail = false;
  secondsToResend = 25;

  recoveryForm = this.fb.group({
    email: [
      null,
      Validators.compose([Validators.required, Validators.email]),
      this.verifyEmail.bind(this)
    ]
  });

  private async verifyEmail(): Promise<any>{
    this.verifiedEmail = 'requesting';
    const promise = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.recoveryForm.get('email').value === 'test@test.com'){
          this.verifiedEmail = 'valid';
          resolve(null);
        }else{
          this.verifiedEmail = 'invalid';
          resolve({notVerifiedEmail: true});
        }
      }, 3500);
    });
    return promise;
  }

  private onResend(): void{
    this.secondsToResend = 25;
    this.waitToResendEmail = true;

    const counter = setInterval(() => {
      if (this.secondsToResend === 0){
        this.waitToResendEmail = false;
        clearInterval(counter);
      }
      return this.secondsToResend--;
    }, 1000);
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder) { }

  onSubmit(): void {

    if (this.recoveryForm.valid){
      this.submitted = true;
      this.onResend();
      this.recoveryForm.reset();
      alert('An email has just been sent to the provided address. check it an follow instructions');
    }else{
      alert('the provided email is invalid, please use a verified email or create a new account');
    }

  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }

}


