import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import { MovementService } from '../../../services/movement/movement.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  user:any;

  movementForm:FormGroup;

  categories: any;
  concepts: any;
  products: any;
  points: any;

  conceptFiltered:any;
  productFiltered:any;
  unit:any;

  titles = ['ID','Categoría', 'Concepto', 'Producto', 'Cantidad', 'Valor unitario', 'Costo total', 'Tipo movimiento', 'Punto Adquisición', 'Fecha', 'Descartar'];
  id = 0;
  movements: any = [];
  backMovements: any = [];
  objectKeys = Object.keys;

  noSavedElements = null;

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

    this.movementForm = this.fb.group({
      category: [null, Validators.required],
      concept: [{value: null, disabled:true}, Validators.required],
      product: [{value: null, disabled:true}, Validators.required],
      point: [null, Validators.required],
      movementType: [null, Validators.required],
      value: ['', Validators.required],
      amount: ['', Validators.required],
      date:[null, Validators.required]
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

    this.movementForm.get('product').valueChanges.subscribe((value)=>{
      if(value){
        this.unit = value.unidad;
      }
    })
  }

  addMovement(form: any){
    try{
      let frontElements = {
      id: this.id,
      category:form.category.nombre_categoria,
      concept:form.concept.nombre_concepto,
      product:form.product.nombre_producto,
      amount:form.amount,
      unitValue:form.value,
      totalAmount:form.amount * form.value,
      movementType:form.movementType,
      point:form.point.nombre_punto,
      date:form.date
    }
    this.id++;
    this.movements.push(frontElements);

    let backElements = {
      id_punto:form.point.id_punto,
      id_producto_servicio:form.product.id_producto,
      id_concepto:form.concept.id_concepto,
      id_categoria:form.category.id_categoria,
      usuario: this.user.uid,
      cantidad: form.amount,
      valor_unitario:form.value,
      tipo_movimiento:form.movementType,
      fecha:form.date
    }
    this.backMovements.push(backElements);
    }catch (error){
      console.log("No fue posible agregar la información");
    }
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
    let noSavedMovements = 0;
    let iterations = false;
    for(let movement of this.backMovements){
      iterations = true;
      this.movSvc.save(movement).subscribe((result)=>{
        if(result != true){
          noSavedMovements++;
        }
      })
    }
    if(iterations){
      this.noSavedElements = noSavedMovements++;
    }
    else{
      this.noSavedElements = null;
    }
  }
}