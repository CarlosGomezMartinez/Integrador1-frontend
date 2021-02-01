import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import firebase from "firebase/app";

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

  constructor(
    private authSvc:AuthService, 
    private router: Router
    ) { }
  public user$: Observable<any> = this.authSvc.afAuth.user;
  
  ngOnInit(): void {
    if(this.authSvc.userAuthenticated()){
      this.router.navigate(['profile'])
    }
  }

  async onLogin(){
    const {email, password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      console.log("resultado: ",user)
      if(user && user.user.emailVerified){
        var usuario = firebase.auth().currentUser;
        localStorage.setItem('user',JSON.stringify([usuario]));
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
