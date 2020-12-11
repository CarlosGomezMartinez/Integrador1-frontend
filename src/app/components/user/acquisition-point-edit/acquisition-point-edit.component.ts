import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';

@Component({
  selector: 'app-acquisition-point-edit',
  templateUrl: './acquisition-point-edit.component.html',
  styleUrls: ['./acquisition-point-edit.component.scss']
})
export class AcquisitionPointEditComponent implements OnInit {
  point: any = {};
  constructor(
    private route: ActivatedRoute,
    private acqSrv: AcquisitionPointService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.acqSrv.get(params.id_punto).subscribe((data)=>{
        this.point = data;
      });
    });
  }

  update(form: NgForm){
    console.log("categoria: ", this.point);
    console.log("form: ", form);
    this.acqSrv.update(form,this.point.id_punto).subscribe(respuesta=>{
      alert(respuesta);
    })
  }

}
