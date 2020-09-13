import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  requesting = false;
  retryLogin = false;
  hidePass = true;

  loginForm = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([ Validators.required, Validators.minLength(8)])]
  });


  constructor(private fb: FormBuilder/* , private router: Router */) {}


  async onSubmit(): Promise<any> {
        this.retryLogin = false;
        if (!this.loginForm.valid){
          return alert( 'Empty form Can\'t be submitted');
        }
        this.requesting = true;
        const isLogged = await this.onLogin();
        if  (!isLogged){
          this.requesting = false;
          this.retryLogin = true;
          return alert('login failed');
        }
        this.requesting = false;
        return 
        //return this.router.navigate(['/session', isLogged.id]);
      }

      private onLogin(): Promise<any> {
        const isLogged = new Promise<any>(
          (resolve, reject) => {
            setTimeout(
              () => {
                if (Math.random() * 10 - 0 < 0){
                return resolve({id: '12456'});
                }else{
                  return resolve(null);
                }
            }, 5000 );
          }
        );
        return isLogged;
      }
}


//


//   hasUnitNumber = false;

//   


//   
// }
