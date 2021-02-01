import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import firebase from "firebase/app";
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-acquisition-point-add',
  templateUrl: './acquisition-point-add.component.html',
  styleUrls: ['./acquisition-point-add.component.scss']
})
export class AcquisitionPointAddComponent implements OnInit {
  point: any = {};
  user:any;
  successMessage: boolean = false;
  dangerMessage: boolean = false;

  constructor(
    private acqSrv: AcquisitionPointService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
    }
  }

  save(form: NgForm){
    if(this.successMessage){
      this.successMessage = false;
    }
    if(this.dangerMessage){
      this.dangerMessage = false;
    }
    if (this.user != null) {
      this.acqSrv.save(form, this.user.uid).subscribe((response)=>{
        if(response == true){
          this.successMessage = true;
        }
        else{
          this.dangerMessage = true;
        }
      })
    }
  }

  closeAlert(alert:string){
    if(alert == 'success'){
      this.successMessage = false;
    }
    else{
      this.dangerMessage = false;
    }
  }

}
