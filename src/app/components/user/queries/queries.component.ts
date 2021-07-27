import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcquisitionPointService } from '@app/services/acquisition-point/acquisition-point.service';
import { AuthService } from '@app/services/auth/auth.service';
import { CategoryService } from '@app/services/category/category.service';
import { ConceptService } from '@app/services/concept/concept.service';
import { ProductService } from '@app/services/product/product.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.scss']
})
export class QueriesComponent implements OnInit {

  user:any;
  queriesForm:FormGroup;
  categories: any;
  concepts: any;
  products: any;
  points: any;
  dangerMessage: boolean = false;
  selection0: string;
  selection1: string;
  consultaTipo: string;
  rango:boolean;

  constructor(
    private fb:FormBuilder,
    private catSvc: CategoryService,
    private conSvc: ConceptService,
    private proSvc: ProductService,
    private acqSvc: AcquisitionPointService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login']);
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      this.catSvc.getAll(this.user.uid).subscribe((categories)=>{
        this.categories = categories;
        this.conSvc.getAllByUser(this.user.uid).subscribe((concepts)=>{
          this.concepts = concepts;
          this.proSvc.getAllByUser(this.user.uid).subscribe((products)=>{
            this.products = products;
            this.acqSvc.getAll(this.user.uid).subscribe((points)=>{
              this.points = points;
            });
          });
        });
      });
    }

    this.queriesForm = this.fb.group({
      consultaTipo:[null, Validators.required],
      selection0:[{value:null, disabled:true}, Validators.required],
      categoria1: [null, Validators.required],
      concepto1: [null,Validators.required],
      producto1: [null,Validators.required],
      point: [{value:null, disabled:true}, Validators.required],
      selection1:[{value:null, disabled:true}, Validators.required],
      categoria2: [null, Validators.required],
      concepto2: [null,Validators.required],
      producto2: [null,Validators.required],
      startDate:[{value:null, disabled:true}],
      finishDate:[{value:null, disabled:true}],
      rango:[null],
      startOptDate:[{value:null, disabled:true}],
      finishOptDate:[{value:null, disabled:true}],
      totalMes:[null],
      costoTotal:[null],
      variacion:[null]
    });

    this.queriesForm.get('consultaTipo').valueChanges.subscribe((value)=>{
      if(value == 'consultaTipo'){
        this.consultaTipo = 'consultaTipo';
        this.queriesForm.get('selection0').enable();
        this.queriesForm.get('point').disable();
        this.queriesForm.get('selection1').disable();
        this.queriesForm.get('startDate').disable();
        this.queriesForm.get('finishDate').disable();
        this.queriesForm.get('rango').enable();

      } else if (value == 'consultaPunto') {
        this.consultaTipo = 'consultaPunto';
        this.queriesForm.get('point').enable();
        this.queriesForm.get('selection0').disable();
        this.queriesForm.get('startDate').disable();
        this.queriesForm.get('finishDate').disable();
        this.queriesForm.get('rango').enable();
      } else {
        this.consultaTipo = 'consultaFecha';
        this.queriesForm.get('selection0').disable();
        this.queriesForm.get('point').disable();
        this.queriesForm.get('selection1').disable();
        this.queriesForm.get('startDate').enable();
        this.queriesForm.get('finishDate').enable();
        this.queriesForm.get('rango').disable();
        this.onChange(false);
        this.queriesForm.get('rango').setValue(null);
        
      }
    });

    this.queriesForm.get('selection0').valueChanges.subscribe((value)=>{
      this.selection0 = value;
    });

    this.queriesForm.get('selection1').valueChanges.subscribe((value)=>{
      this.selection1 = value;
    });

    this.queriesForm.get('point').valueChanges.subscribe((value)=>{
      if(value != null){
        this.queriesForm.get('selection1').enable();
      }
    })
  }

  public closeAlert(alert:string){
     if(alert == 'danger'){
       this.dangerMessage = false;
     }
  }

  public onChange(isChecked: boolean):void{
    if(isChecked){
      this.queriesForm.get('startOptDate').enable();
      this.queriesForm.get('finishOptDate').enable();
    }else{
      this.queriesForm.get('startOptDate').disable();
      this.queriesForm.get('finishOptDate').disable();
    }
  };

  public sendParameters(form: any):void{
    if(form.consultaTipo){
      let datos = {
        queryType: form.consultaTipo, 
        selectionType: null, 
        objectSelectionType: null, 
        selectedPoint: null, 
        pointCharacteristicType: null, 
        pointCharacteristicValue: null,
        startDate: null,
        finishDate: null,
        range: false,
        startOptionalDate: null,
        finishOptionalDate: null,
        totalPerMonth: false,
        totalCost: false,
        variation: false
      }
      switch(form.consultaTipo){
        case 'consultaTipo':
          if(form.selection0 && (form.categoria1 || form.concepto1 || form.producto1)){
            datos.selectionType = form.selection0;
            switch(form.selection0){
              case 'categoría':
                datos.objectSelectionType = form.categoria1.id_categoria;
                break;
              case 'concepto':
                datos.objectSelectionType = form.concepto1.id_concepto;
                break;
              case 'producto':
                datos.objectSelectionType = form.producto1.id_producto_servicio;
                break;
              default:
                console.log('Primera selección inesperada');
                return;
            }
          }else{
            this.dangerMessage = true;
            return;
          }
          break;

        case 'consultaPunto':
          if(form.point && form.selection1 && (form.categoria2 || form.concepto2 || form.producto2)){
            datos.selectedPoint = form.point.id_punto;
            datos.pointCharacteristicType = form.selection1;
            switch(form.selection1){
              case 'categoría':
                datos.pointCharacteristicValue = form.categoria2.id_categoria;
                break;
              case 'concepto':
                datos.pointCharacteristicValue = form.concepto2.id_concepto;
                break;
              case 'producto':
                datos.pointCharacteristicValue = form.producto2.id_producto_servicio;
                break;
              default:
                console.log('Primera selección inesperada');
                return;
            }
          }else{
            this.dangerMessage = true;
            return;
          }
          break;

        case 'consultaFecha':
          if(form.startDate && form.finishDate){
            datos.startDate = form.startDate;
            datos.finishDate = form.finishDate;
          }else{
            this.dangerMessage = true;
            return;
          }
          break;

        default:
          console.log('default');
          return;
      }
      if(form.rango){
        datos.range = form.rango;
        if(form.startOptDate && form.finishOptDate){
          datos.startOptionalDate = form.startOptDate;
          datos.finishOptionalDate = form.finishOptDate;
        }else{
          this.dangerMessage = true;
          return;
        }
      }
      if(form.totalMes){
        datos.totalPerMonth = form.totalMes;
      }
      if(form.costoTotal){
        datos.totalCost = form.costoTotal;
      }
      if(form.variacion){
        datos.variation = form.variacion;
      }
      localStorage.setItem('datos', JSON.stringify(datos));
      this.router.navigate(['/report'])
    }else{
      this.dangerMessage = true;
    }
  }
}