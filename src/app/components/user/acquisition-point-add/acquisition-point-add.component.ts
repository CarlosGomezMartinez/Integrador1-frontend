import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-acquisition-point-add',
  templateUrl: './acquisition-point-add.component.html',
  styleUrls: ['./acquisition-point-add.component.scss']
})
export class AcquisitionPointAddComponent implements OnInit {
  point: any = {};
  constructor(
    private acqSrv: AcquisitionPointService
  ) { }

  ngOnInit(): void {
  }

  save(form: NgForm){
    console.log(this.point)
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.acqSrv.save(form, user.uid).subscribe((data)=>{
        console.log(data);
      })
    }
  }

}
