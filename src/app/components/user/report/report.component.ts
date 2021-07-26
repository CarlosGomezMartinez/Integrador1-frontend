import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { QueriesService } from '@app/services/queries/queries.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Validators } from '@angular/forms';
import { MovementService } from '@app/services/movement/movement.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  actualDate = (new Date(Date.now())).toString().slice(3,24);
  listedMovements: string;
  principalTitles = ['Fecha','Categoría', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario', 'Tipo movimiento', 'Punto Adquisición'];
  movements: any = [];
  objectKeys = Object.keys;

  costoPorMes: boolean;
  costTitles = ['Mes/Año', 'Costo Total'];
  dataCostPerMonth: any;

  totalCost: string;
  

  @ViewChild('htmlData')htmlData:ElementRef;
  user:any;

  constructor(
    private authSvc:AuthService, 
    private querSvc:QueriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      let datos = JSON.parse(localStorage.getItem('datos'));

      let infoQuery = {
        tipo: datos.selectionType,
        idTipo: datos.objectSelectionType,
        idPunto: datos.selectedPoint,
        tipoParaPunto: datos.pointCharacteristicType,
        idTipoParaPunto: datos.pointCharacteristicValue,
        start: datos.startDate,
        finish: datos.finishDate,
        existFecha: datos.range,
        fechaInicial: datos.startOptionalDate,
        fechaFinal: datos.finishOptionalDate
      }
      
      switch(datos.queryType){
        case 'consultaTipo':
          this.querSvc.getByType(this.user.uid, infoQuery).subscribe((data)=>{
            if(data.length > 0){
              this.costoPorMes = datos.totalPerMonth;
              if(datos.totalPerMonth){
                this.costPerMonth(data);
              }
              if(datos.totalCost){
                this.costTotalize(data);
              }
              if(datos.variation){
                console.log('con variación');
                this.typeWithVariation(data, infoQuery);
              }else{
                console.log('sin variación');
                this.type(data, infoQuery);
              }
            }
          })
          break;

        case 'consultaPunto':
            this.querSvc.getByPoint(this.user.uid, infoQuery).subscribe((data)=>{
              if(data.length > 0){
                this.costoPorMes= datos.totalPerMonth;
                if(datos.totalPerMonth){
                  this.costPerMonth(data);
                }
                if(datos.totalCost){
                  this.costTotalize(data);
                }
                if(datos.variation){
                  this.typeWithVariation(data, infoQuery);
                }else{
                  this.type(data, infoQuery);
                }
              }
            })
          break;

        case 'consultaFecha':
          this.querSvc.getByDate(this.user.uid, infoQuery).subscribe((data)=>{
            if(data.length > 0){
              let desdeFecha = datos.startDate;
              let hastaFecha = datos.finishDate;
              this.listedMovements = `desde el ${desdeFecha} hasta el ${hastaFecha}`;
              this.principalTitles = ['Fecha','Punto Adquisición','Categoría','Concepto','Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento'];
              let datosAPresentar = [];
              for(let i=0; i<data.length; i++){
                datosAPresentar[i] = {
                  fecha: data[i].fecha.slice(0,10),
                  punto: data[i].punto,
                  categoria: data[i].categoria,
                  concepto: data[i].concepto,
                  producto_servicio: data[i].producto_servicio,
                  cantidad: data[i].cantidad,
                  valorUnitario: data[i].valor,
                  costoTotal: data[i].cantidad*data[i].valor,
                  tipoMovimiento: data[i].movimiento
                }
              }
              this.movements = datosAPresentar;
              this.costoPorMes= datos.totalPerMonth;
              if(datos.totalPerMonth){
                this.costPerMonth(data);
              }
              if(datos.totalCost){
                this.costTotalize(data);
              }
            }
          })
          break;

        default:
          console.log('Tipo de consulta incorrecto');
          break;
      }
    }
  }

  ngOnDestroy():void{
    localStorage.removeItem('datos');
  }

  public PDFGenerate():void{
    let DATA = window.document.getElementById('htmlData');
    console.log(DATA);
    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF();
      let position = 0;
      PDF.addImage(FILEURI,'PNG',0,position, fileWidth, fileHeight)

      PDF.save('Informe '+this.actualDate+'.pdf');
    });
  }

  public type(data: any, infoQuery:any):void{
    if(infoQuery.tipo === 'categoría'){
      let name = data[0].categoria;
      this.listedMovements = `para la categoría ${name}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento'];
      let datos = [];
      for(let i = 0; i < data.length; i++){
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          concepto: data[i].concepto,
          producto_servicio: data[i].producto_servicio,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento
        }
      }
      this.movements = datos;
    }
    else if(infoQuery.tipo === 'concepto'){
      let name = data[0].concepto;
      this.listedMovements = `para el concepto ${name}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento'];
      let datos = [];
      for(let i = 0; i < data.length; i++){
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          producto_servicio: data[i].producto_servicio,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento
        }
      }
      this.movements = datos;
    }
    else{
      let name = data[0].producto_servicio;
      this.listedMovements = `para el producto o servicio ${name}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento'];
      let datos = [];
      for(let i = 0; i < data.length; i++){
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento
        }
      }
      this.movements = datos;
    }
  }

  public costPerMonth(data:any):void{
    let dates = [];
    let fecha = '';
    let totalCost = 0;
    for(let oneData of data){
      fecha = oneData.fecha.slice(0,7);
      totalCost = oneData.valor*oneData.cantidad;
      if(dates.length == 0){
        dates.push({
          date:fecha,
          costPerMonth: totalCost
        });
      }else{
        for(let i=0; i < dates.length; i++){
          if(dates[i].date == fecha){
            dates[i].costPerMonth += totalCost;
            break;
          }else if((dates[i].date != fecha) && (i == dates.length-1)){
            dates.push({
              date:fecha,
              costPerMonth: totalCost
            });
            break;
          }
        }
      };
    }
    this.dataCostPerMonth = dates;
  }

  public costTotalize(data: any):void{
    let total = 0;
    data.map(element => total += element.valor*element.cantidad);
    this.totalCost = `COP ${total}`;
  }

  public typeWithVariation(data: any, infoQuery:any):void{
    if(infoQuery.tipo === 'categoría'){
      let name = data[0].categoria;
      this.listedMovements = `para la categoría ${name}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento', '$ Variación', '% Variación'];
      let datos = [];
      let valor;
      let porcentaje;
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          valor = data[i].valor-datos[i-1].valorUnitario;
          porcentaje = 100-(data[i].valor*100)/datos[i-1].valorUnitario;
        }
        else{
          valor = data[i].valor;
          porcentaje = 0;
        }

        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          concepto: data[i].concepto,
          producto_servicio: data[i].producto_servicio,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento,
          variacionPesos: valor,
          variacionPorcentaje: porcentaje.toString().slice(0,5)
        }
      }
      this.movements = datos;
    }
    else if(infoQuery.tipo === 'concepto'){
      let name = data[0].concepto;
      this.listedMovements = `para el concepto ${name}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento','$ Variación', '% Variación'];
      let datos = [];
      let valor;
      let porcentaje;
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          valor = data[i].valor-datos[i-1].valorUnitario;
          porcentaje = 100-(data[i].valor*100)/datos[i-1].valorUnitario;
        }
        else{
          valor = data[i].valor;
          porcentaje = 0;
        }
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          producto_servicio: data[i].producto_servicio,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento,
          variacionPesos: valor,
          variacionPorcentaje: porcentaje.toString().slice(0,5)
        }
      }
      this.movements = datos;
    }
    else{
      let name = data[0].producto_servicio;
      this.listedMovements = `para el producto o servicio ${name}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento','$ Variación', '% Variación'];
      let datos = [];
      let valor;
      let porcentaje;
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          valor = data[i].valor-datos[i-1].valorUnitario;
          porcentaje = 100-(data[i].valor*100)/datos[i-1].valorUnitario;
        }
        else{
          valor = data[i].valor;
          porcentaje = 0;
        }
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento,
          variacionPesos: valor,
          variacionPorcentaje: porcentaje.toString().slice(0,5)
        }
      }
      this.movements = datos;
    }
  }
}