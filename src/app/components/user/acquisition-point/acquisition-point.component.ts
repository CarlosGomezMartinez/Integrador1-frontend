import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-acquisition-point',
  templateUrl: './acquisition-point.component.html',
  styleUrls: ['./acquisition-point.component.scss']
})
export class AcquisitionPointComponent implements OnInit {
  acquisitionPoints: any = [{}];
  filtro: string;
  categoriesFound: any = [{}];

  constructor(
    private router: Router,
    private acqSrv: AcquisitionPointService
  ) 
  { }

  ngOnInit(): void {
    let user = firebase.auth().currentUser;
    console.log("usuario: ", user);
    this.acqSrv.getAll(user.uid).subscribe((data)=>{
      this.acquisitionPoints = data;
      console.log("puntos: ", data)
    })
  }

  remove(id: string){
    console.log(id)
    this.acqSrv.remove(id).subscribe(data =>{
      let index = this.acquisitionPoints.indexOf(this.acquisitionPoints.filter(data => data.id_punto == id)[0])
      this.acquisitionPoints.splice(index,1);
      this.router.navigate(['/acquisition-point']);
      console.log(data);
    });
  }
}
