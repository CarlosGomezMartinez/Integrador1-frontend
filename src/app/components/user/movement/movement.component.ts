import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import { MovementService } from '../../../services/movement/movement.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'))[0];

  movementForm:FormGroup;

  categories: any;
  concepts: any;
  products: any;
  points: any;

  conceptFiltered:any;
  productFiltered:any;

  titles = ['ID','Categoría', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario', 'Costo total', 'Tipo movimiento', 'Punto Adquisición', 'Descartar'];
  id = 0;
  movements: any = [];
  backMovements: any = [];
  objectKeys = Object.keys;

  constructor(
    private fb:FormBuilder,
    private catSvc: CategoryService,
    private conSvc: ConceptService,
    private proSvc: ProductService,
    private acqSvc: AcquisitionPointService,
    private movSvc: MovementService
  ) {
  }

  ngOnInit(): void {
    if (this.user){
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
    };
    this.movementForm = this.fb.group({
      category: [null, Validators.required],
      concept: [{value: null, disabled:true}, Validators.required],
      product: [{value: null, disabled:true}, Validators.required],
      point: [, Validators.required],
      movementType: [null, Validators.required],
      value: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.movementForm.get('category').valueChanges.subscribe((value)=>{
      if(value){
        this.movementForm.get('concept').enable();
        this.conceptFiltered = this.concepts.filter((c)=>c.id_categoria === value.id_categoria);
      }
      else{
        this.movementForm.get('concept').disable();
      }
    });

    this.movementForm.get('concept').valueChanges.subscribe((valor)=>{
      if(valor){
        this.movementForm.get('product').enable();
        this.productFiltered = this.products.filter((c)=>c.id_concepto === valor.id_concepto);
      }
      else{
        this.movementForm.get('product').disable();
      }
    });
  }

  addMovement(form: any){
    let frontElements={
      id: this.id,
      category:form.category.nombre_categoria,
      concept:form.concept.nombre_concepto,
      product:form.product.nombre_producto,
      amount:form.amount,
      unitValue:form.value,
      totalAmount:form.amount * form.value,
      movementType:form.movementType,
      point:form.point.nombre_punto
    }
    this.id++;
    this.movements.push(frontElements);

    let backElements={
      id_punto:form.point.id_punto,
      id_producto_servicio:form.product.id_producto,
      id_concepto:form.concept.id_concepto,
      id_categoria:form.category.id_categoria,
      usuario: this.user.uid,
      cantidad: form.amount,
      valor_unitario:form.value,
      tipo_movimiento:form.movementType
    }
    this.backMovements.push(backElements);
  }

  removeMovement(ref){
    let deleteElement;
    this.backMovements
    for(let key of Object.keys(this.movements)){
      if(this.movements[key].id==ref){
        deleteElement = key;
      }
    }
    this.backMovements.splice(parseInt(deleteElement), 1);
    this.movements.splice(parseInt(deleteElement), 1);
  }

  saveMovements(){
    for(let movement of this.backMovements){
      this.movSvc.save(movement).subscribe((result)=>{
        console.log(result);
      })
    }
  }

}