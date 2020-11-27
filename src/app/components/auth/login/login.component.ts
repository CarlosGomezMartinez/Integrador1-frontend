import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authSvc:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onGoogleLogin(){
    try {
      await this.authSvc.loginGoogle();
      this.router.navigate(['/profile']);
    } catch (error) {
      console.log(error);
    }
  }

  async onFacebookLogin(){
    try {
      this.authSvc.loginFacebook();
      this.router.navigate(['/profile']);
    } catch (error) {
      console.log(error);
    }
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if(user && user.user.emailVerified){
        //redirect to usuario loggeado
        this.router.navigate(['/profile']);
      } else if (user && !user.user.emailVerified){
        this.router.navigate(['/verification-email']);
      } else {
        this.router.navigate(['/register']);
      }
    } catch (error) {
      console.log(error)
    }
        
  }

}
