import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { MovementService } from '../../../services/movement/movement.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  user:any;
  timeForm: FormGroup;

  titles = ['Fecha','Categoría', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario', 'Tipo movimiento', 'Punto Adquisición'];

  movements: any = [];
  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
    private movSvc: MovementService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      this.timeForm = this.fb.group({
        start:[null, Validators.required],
        finish: [null, Validators.required]
      })
    }
  }

  search(form: any){
    let objeto = {
      userID: this.user.uid,
      start: form.start,
      finish: form.finish
    }
    this.movSvc.getByDate(objeto).subscribe((movements)=>{
      console.log("movimientos: ",movements);
      for(let i=0; i < movements.length; i++){
        movements[i].fecha = movements[i].fecha.slice(0, 10);
      }
      this.movements = movements;
    })
  }
}
