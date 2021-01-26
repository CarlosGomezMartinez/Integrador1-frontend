import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from "firebase/app";
import { CategoryService } from '../../../services/category/category.service';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'))[0];

  movementForm:FormGroup;
  /*categories = [
    { id_categoria: 1, nombre_categoria: "United States" },
    { id_categoria: 2, nombre_categoria: "Australia" },
    { id_categoria: 3, nombre_categoria: "Canada" },
    { id_categoria: 4, nombre_categoria: "Brazil" },
    { id_categoria: 5, nombre_categoria: "England" }
  ];*/

  categories: any;
  concepts: any;
  products: any;
  points: any;

  selectedCategory = null;
  selectedConcept = null;

  titles = ['Categoría', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario', 'Costo total', 'Tipo movimiento'];
  id = 0;
  movements: any = [];
  objectKeys = Object.keys;

  constructor(
    private fb:FormBuilder,
    private catSvc: CategoryService,
    private conSvc: ConceptService,
    private proSvc: ProductService,
    private acqSvc: AcquisitionPointService
  ) {
  }

  ngOnInit(): void {
    if (this.user){
      this.catSvc.getAll(this.user.uid).subscribe((categories)=>{
        this.categories = categories;
        this.conSvc.getAllByUser(this.user.uid).subscribe((concepts)=>{
          this.concepts = concepts;
          console.log("concepts: ",concepts);
          this.proSvc.getAllByUser(this.user.uid).subscribe((products)=>{
            this.products = products;
            console.log("products: ",products);
            this.acqSvc.getAll(this.user.uid).subscribe((points)=>{
              this.points = points;
            })
          });
        });
      });
    };
    this.movementForm = this.fb.group({
      category: [null, Validators.required],
      concept: [{value: null, disabled:true}, Validators.required],
      product: [{value: null, disabled:true}, Validators.required],
      point: [null, Validators.required],
      movementType: [null, Validators.required],
      value: [null, Validators.required],
      amount: [null, Validators.required]
    });

    this.movementForm.get('category').valueChanges.subscribe((value)=>{
      if(value){
        this.movementForm.get('concept').enable();
        this.selectedCategory = value;
      }
      else{
        this.movementForm.get('concept').disable();
      }
    });

    this.movementForm.get('concept').valueChanges.subscribe((valor)=>{
      if(valor){
        this.movementForm.get('product').enable();
        this.selectedConcept = valor;
      }
      else{
        this.movementForm.get('product').disable();
      }
    });
  }

  submit() {
    console.log("Form Submitted")
    console.log(this.movementForm.value)
  }

  addMovement(){

  }

  removeMovement(){

  }

  saveMovements(){

  }

}