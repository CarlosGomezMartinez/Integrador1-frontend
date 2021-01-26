import { Component, OnInit } from '@angular/core';
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
  public user = JSON.parse(localStorage.getItem('user'))[0];

  constructor(
    private acqSrv: AcquisitionPointService
  ) 
  { }

  ngOnInit(): void {
    this.acqSrv.getAll(this.user.uid).subscribe((data)=>{
      this.acquisitionPoints = data;
    })
  }

  remove(id: string){
    this.acqSrv.remove(id).subscribe(data =>{
      let index = this.acquisitionPoints.indexOf(this.acquisitionPoints.filter(data => data.id_punto == id)[0])
      this.acquisitionPoints.splice(index,1);
      console.log(data);
    });
  }
}
