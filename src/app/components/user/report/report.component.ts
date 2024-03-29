import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { QueriesService } from '@app/services/queries/queries.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
                this.typeWithVariation(data, infoQuery);
              }else{
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
              /* this.principalTitles = ['Fecha','Punto Adquisición','Categoría','Concepto','Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento']; */
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
              if(datos.variation){
                this.typeWithVariation(data, infoQuery);
              }else{
                this.type(data, infoQuery);
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


  public print(){
    document.getElementById("buttons").style.display = "none"; 
    window.print();
    document.getElementById("buttons").style.display = 'block'; 
  }

  public type(data: any, infoQuery:any):void{
    if(infoQuery.tipo === 'categoría' || infoQuery.tipoParaPunto ==='categoría'){
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
    else if(infoQuery.tipo === 'concepto' || infoQuery.tipoParaPunto ==='concepto'){
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
    else if(infoQuery.tipo === 'producto' || infoQuery.tipoParaPunto ==='producto'){
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
    else{
      this.principalTitles = ['Fecha','Punto Adquisición','Categoría','Concepto','Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento'];
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
    let datos = [];
    let valorVariacion;
    let porcentajeVariacion;

    var uniqueProducts = []; 
    data.forEach(function(item){ 
      var i = uniqueProducts.findIndex(x => x.id_producto == item.id_producto_servicio); 
      if(i <= -1){ 
        uniqueProducts.push({id_producto: item.id_producto_servicio,valor: item.valor}); 
      } 
    });
    console.log(uniqueProducts)

    if(infoQuery.tipo === 'categoría' || infoQuery.tipoParaPunto ==='categoría'){
      this.listedMovements = `para la categoría ${data[0].categoria}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento', '$ Variación', '% Variación'];
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          var index = uniqueProducts.findIndex(x => x.id_producto == data[i].id_producto_servicio);
          valorVariacion = data[i].valor-uniqueProducts[index].valor;
          porcentajeVariacion = ((data[i].valor-uniqueProducts[index].valor)/uniqueProducts[index].valor)*100;
          uniqueProducts[index].valor = data[i].valor;
        }
        else{
          valorVariacion = 0;
          porcentajeVariacion = 0;
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
          variacionPesos: valorVariacion,
          variacionPorcentaje: porcentajeVariacion.toFixed(2)
        }
      }
    }
    else if(infoQuery.tipo === 'concepto' || infoQuery.tipoParaPunto === 'concepto'){
      this.listedMovements = `para el concepto ${data[0].concepto}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento','$ Variación', '% Variación'];
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          var index = uniqueProducts.findIndex(x => x.id_producto == data[i].id_producto_servicio);
          valorVariacion = data[i].valor-uniqueProducts[index].valor;
          porcentajeVariacion = ((data[i].valor-uniqueProducts[index].valor)/uniqueProducts[index].valor)*100;
          uniqueProducts[index].valor = data[i].valor;
        }
        else{
          valorVariacion = data[i].valor;
          porcentajeVariacion = 0;
        }
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          producto_servicio: data[i].producto_servicio,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento,
          variacionPesos: valorVariacion,
          variacionPorcentaje: porcentajeVariacion.toFixed(2)
        }
      }
    }
    else if (infoQuery.tipo === 'producto' || infoQuery.tipoParaPunto ==='producto'){
      this.listedMovements = `para el producto o servicio ${data[0].producto_servicio}`;
      this.principalTitles = ['Fecha','Punto Adquisición', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento','$ Variación', '% Variación'];
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          var index = uniqueProducts.findIndex(x => x.id_producto == data[i].id_producto_servicio);
          valorVariacion = data[i].valor-uniqueProducts[index].valor;
          porcentajeVariacion = ((data[i].valor-uniqueProducts[index].valor)/uniqueProducts[index].valor)*100;
          uniqueProducts[index].valor = data[i].valor;
        }
        else{
          valorVariacion = 0;
          porcentajeVariacion = 0;
        }
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento,
          variacionPesos: valorVariacion,
          variacionPorcentaje: porcentajeVariacion.toFixed(2)
        }
      }
    }
    else{
      this.principalTitles = ['Fecha','Punto Adquisición','Categoría','Concepto','Producto', 'Cantidad', 'Valor unitario','Costo total', 'Tipo movimiento', '$ Variación', '% Variación'];
      for(let i = 0; i < data.length; i++){
        if(i != 0){
          var index = uniqueProducts.findIndex(x => x.id_producto == data[i].id_producto_servicio);
          valorVariacion = data[i].valor-uniqueProducts[index].valor;
          porcentajeVariacion = ((data[i].valor-uniqueProducts[index].valor)/uniqueProducts[index].valor)*100;
          uniqueProducts[index].valor = data[i].valor;
        }
        else{
          valorVariacion = 0;
          porcentajeVariacion = 0;
        }
        datos[i] = {
          fecha: data[i].fecha.slice(0,10),
          punto: data[i].punto,
          categoria: data[i].categoria,
          concepto: data[i].concepto,
          producto_servicio: data[i].producto_servicio,
          cantidad: data[i].cantidad,
          valorUnitario: data[i].valor,
          costoTotal: data[i].cantidad*data[i].valor,
          tipoMovimiento: data[i].movimiento,
          variacionPesos: valorVariacion,
          variacionPorcentaje: porcentajeVariacion.toFixed(2)
        }
      }
    }
    this.movements = datos;
  }
}