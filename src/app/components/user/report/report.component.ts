import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { MovementService } from '../../../services/movement/movement.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  actualDate = (new Date(Date.now())).toString().slice(3,24);
  listedMovements = "la categoría " + "casa";
  principalTitles = ['Fecha','Categoría', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario', 'Tipo movimiento', 'Punto Adquisición'];
  costoPorMes = true;
  costTitles = ['Mes/Año', 'Costo Total'];
  totalCost = "COP " + 1234567;
  

  @ViewChild('htmlData')htmlData:ElementRef;
  user:any;
  timeForm: FormGroup;

  movements: any = [];
  objectKeys = Object.keys;

  constructor(
    private fb: FormBuilder,
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

  public PDFGenerate():void{
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('Informe '+this.actualDate+'.pdf');
    });
  }
}
