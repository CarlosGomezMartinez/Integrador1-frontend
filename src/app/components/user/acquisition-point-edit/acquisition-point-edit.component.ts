import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';

@Component({
  selector: 'app-acquisition-point-edit',
  templateUrl: './acquisition-point-edit.component.html',
  styleUrls: ['./acquisition-point-edit.component.scss']
})
export class AcquisitionPointEditComponent implements OnInit {
  point: any = {};
  successMessage: boolean = false;
  dangerMessage: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private acqSrv: AcquisitionPointService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.route.params.subscribe((params)=>{
        this.acqSrv.get(params.id_punto).subscribe((data)=>{
          this.point = data;
        });
      });
    }
  }

  update(form: NgForm){
    if(this.successMessage){
      this.successMessage = false;
    }
    if(this.dangerMessage){
      this.dangerMessage = false;
    }
    this.acqSrv.update(form,this.point.id_punto).subscribe((response)=>{
      if(response ==true){
        this.successMessage = true;
      }
      else{
        this.dangerMessage = true;
      }
    })
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
