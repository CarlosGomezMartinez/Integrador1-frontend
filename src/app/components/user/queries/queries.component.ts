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

  conceptFiltered:any;
  productFiltered:any;
  unit:any;

  successMessage: boolean = false;
  dangerMessage: boolean = false;

  selection0: any;
  selection1: any;
  selectionCat: any;
  selectionCon: any;
  selectionProd: any;

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
      selection0:[null, Validators.required],
      selection1:[null, Validators.required],
      category: [null, Validators.required],
      concept: [{value: null, disabled:false}, Validators.required],
      product: [{value: null, disabled:false}, Validators.required],
      point: [null, Validators.required],
      movementType: [null, Validators.required],
      value: ['', Validators.required],
      amount: ['', Validators.required],
      date:[this.date, Validators.required],
      consultaTipo:[],
      consultaPunto:[],
      consultaFecha:[],
      startDate:[],
      finishDate:[],
      startOptDate:[],
      finishOptDate:[]
    });

    this.queriesForm.get('selection0').valueChanges.subscribe((value)=>{
      this.selection0 = value;
    })

    this.queriesForm.get('selection1').valueChanges.subscribe((value)=>{
      this.selection1 = value;
    })

    this.queriesForm.get('category').valueChanges.subscribe((value)=>{
      if(value){
        this.selectionCat = value;
        this.selectionCon = null;
        this.selectionProd = null;
      }
    });
    this.queriesForm.get('concept').valueChanges.subscribe((valor)=>{
      if(valor){
        this.selectionCat = null;
        this.selectionCon = valor;
        this.selectionProd = null;
      }
    });
    this.queriesForm.get('product').valueChanges.subscribe((value)=>{
      if(value){
        this.selectionCat = null;
        this.selectionCon = null;
        this.selectionProd = value;
      }
    })
  }

  // closeAlert(alert:string){
  //   if(alert == 'success'){
  //     this.successMessage = false;
  //   }
  //   else{
  //     this.dangerMessage = false;
  //     }
  // }
}
