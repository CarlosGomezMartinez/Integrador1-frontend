import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');

  constructor(
    private authSvc:AuthService, 
    private router:Router
    ) { }

  ngOnInit(): void {
    if(this.authSvc.userAuthenticated()){
      this.router.navigate(['profile'])
    }
  }

  async onReset(){
    try {
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert('Email enviado, por favor revisa tu bandeja de entrada');
      //Redirect a login
      this.router.navigate(['/login']);
    }
    catch (error) {
      console.log(error);
      
    }
  }

}
