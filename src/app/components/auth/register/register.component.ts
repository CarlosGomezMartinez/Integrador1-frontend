import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authSvc: AuthService, 
    private router:Router
    ) { }

  ngOnInit(): void {
    if(this.authSvc.userAuthenticated()){
      this.router.navigate(['profile'])
    }
  }

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email, password);
      if (user){
        //redirect
        this.router.navigate(['/verification-email']);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
