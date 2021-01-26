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

  contactForm:FormGroup;
 
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

  titles = ['ID', 'Nombre', 'Descripción', 'Cantidad', 'Valor unitario', 'Valor total', 'Descartar'];
  id = 0;
  details: any = [];
  objectKeys = Object.keys;

  @ViewChild('category') inputCategory;
  @ViewChild('concept') inputConcept;
  @ViewChild('valor') inputValor;

  constructor(
    private fb:FormBuilder,
    private catSvc: CategoryService,
    private conSvc: ConceptService,
    private proSvc: ProductService,
    private acqSvc: AcquisitionPointService
  ) {
  }

  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    console.log("user: ",user);
    if (user){
      this.catSvc.getAll(user.uid).subscribe((categories)=>{
        this.categories = categories;
        this.conSvc.getAllByUser(user.uid).subscribe((concepts)=>{
          this.concepts = concepts;
          this.proSvc.getAllByUser(user.uid).subscribe((products)=>{
            this.products = products;
            this.acqSvc.getAll(user.uid).subscribe((points)=>{
              this.points = points;
            })
          });
        });
      });
    };
    this.contactForm = this.fb.group({
      category: [null],
      concept: [null],
      product: [null],
      point: [null],
      movement: [null]
    });
  }

  selectCategory(idCategory: string){
    console.log("hola")
    this.selectedCategory = idCategory;
    this.inputConcept.nativeElement.disabled = true;
  }

  selectConcept(idConcept: string){

  }

  selectedProduct(idProduct: string){

  }

  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value)
  }

}