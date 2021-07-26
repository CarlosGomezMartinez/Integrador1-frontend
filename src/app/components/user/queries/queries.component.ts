import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AcquisitionPointService } from '@app/services/acquisition-point/acquisition-point.service';
import { AuthService } from '@app/services/auth/auth.service';
import { CategoryService } from '@app/services/category/category.service';
import { ConceptService } from '@app/services/concept/concept.service';
import { MovementService } from '@app/services/movement/movement.service';
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
  date = new Date();
  caracteristicas: [];

  conceptFiltered:any;
  productFiltered:any;
  unit:any;

  successMessage: boolean = false;
  dangerMessage: boolean = false;

  selection0: any;
  selection1: any;
  selectedCharacteristic: any;
  consultaTipo: any;
  startDate: any;
  finishDate: any;
  rango:any;
  startOptDate: any;
  finishOptDate: any;
  totalMes:any;
  costoTotal: any;
  variacion: any;

  constructor(
    private fb:FormBuilder,
    private catSvc: CategoryService,
    private conSvc: ConceptService,
    private proSvc: ProductService,
    private acqSvc: AcquisitionPointService,
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
      this.catSvc.getAll(this.user.uid).subscribe((categories)=>{
        this.categories = categories;
        this.conSvc.getAllByUser(this.user.uid).subscribe((concepts)=>{
          this.concepts = concepts;
          this.proSvc.getAllByUser(this.user.uid).subscribe((products)=>{
            this.products = products;
            this.acqSvc.getAll(this.user.uid).subscribe((points)=>{
              this.points = points;
            })
          });
        });
      });
    }

    this.queriesForm = this.fb.group({
      consultaTipo:[null, Validators.required],
      selection0:[{value:null, disabled:true}, Validators.required],
      selectedCharacteristic: [null, Validators.required],
      point: [{value:null, disabled:true}, Validators.required],
      selection1:[{value:null, disabled:true}, Validators.required],
      startDate:[{value:null, disabled:true}],
      finishDate:[{value:null, disabled:true}],
      rango:[null],
      startOptDate:[{value:null, disabled:true}],
      finishOptDate:[{value:null, disabled:true}],
      totalMes:[null],
      costoTotal:[null],
      variacion:[null]
    });

    this.queriesForm.get('selection0').valueChanges.subscribe((value)=>{
      this.selection0 = value;
    })

    this.queriesForm.get('selection1').valueChanges.subscribe((value)=>{
      this.selection1 = value;
    })

    this.queriesForm.get('consultaTipo').valueChanges.subscribe((value)=>{
      if(value){
        this.consultaTipo = value;
      }
    });
  }

  // closeAlert(alert:string){
  //   if(alert == 'danger'){
  //     this.dangerMessage = false;
  //   }
  // }
}
