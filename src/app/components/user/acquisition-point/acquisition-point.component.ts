import { Component, OnInit } from '@angular/core';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import firebase from "firebase/app";
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-acquisition-point',
  templateUrl: './acquisition-point.component.html',
  styleUrls: ['./acquisition-point.component.scss']
})
export class AcquisitionPointComponent implements OnInit {
  acquisitionPoints: any = [{}];
  filtro: string;
  categoriesFound: any = [{}];
  titles = ['Concepto', 'Ver/editar', 'Eliminar'];
  user: any;

  constructor(
    private acqSrv: AcquisitionPointService,
    private authSvc:AuthService, 
    private router: Router
  ) 
  { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      this.acqSrv.getAll(this.user.uid).subscribe((data)=>{
        this.acquisitionPoints = data;
      })
    }
  }

  remove(id: string){
    this.acqSrv.remove(id).subscribe((data) =>{
      if(data == true){
        let index = this.acquisitionPoints.indexOf(this.acquisitionPoints.filter(data => data.id_punto == id)[0])
        this.acquisitionPoints.splice(index,1);
      }
      else{
        console.log(data);
      }
    });
  }
}
