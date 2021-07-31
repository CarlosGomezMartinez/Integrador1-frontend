import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';
import { AcquisitionPointService } from '../../../services/acquisition-point/acquisition-point.service';
import { MovementService } from '../../../services/movement/movement.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { ReturnStatement } from '@angular/compiler';

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
  date = new Date();

  conceptFiltered:any;
  productFiltered:any;
  unit:any;
  singleValue: number;
  total: number;

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
      category: new FormControl(null, Validators.required),
      concept: new FormControl({value: null, disabled:true}, Validators.required),
      product: new FormControl({value: null, disabled:true}, Validators.required),
      point: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      movementType: new FormControl(null, Validators.required),
      unitValue: [null, Validators.required],
      totalValue:[null, Validators.required],
      date: new FormControl(this.date, Validators.required)
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

    this.movementForm.get('unitValue').valueChanges.subscribe((value)=>{
      if(value){
        this.movementForm.get('totalValue').disable({emitEvent: false});
      }else{
        this.movementForm.get('totalValue').enable({emitEvent: false});
      }
    })

    this.movementForm.get('totalValue').valueChanges.subscribe((value)=>{
      if(value){
        this.movementForm.get('unitValue').disable({emitEvent: false});
      }else{
        this.movementForm.get('unitValue').enable({emitEvent: false});
      }
    })
  }

  addMovement(form: any){
    if(form.unitValue){
      this.singleValue = form.unitValue;
      this.total = form.unitValue * form.amount;
    }else{
      this.singleValue = form.totalValue / form.amount;
      this.total = form.totalValue;
    }
    try{
      let frontElements = {
        id: this.id,
        category:form.category.nombre_categoria,
        concept:form.concept.nombre_concepto,
        product:form.product.nombre_producto,
        amount:form.amount,
        unitValue:this.singleValue,
        totalAmount:this.total,
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
        valor_unitario:this.singleValue,
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
      if(this.noSavedElements == 0){
        this.backMovements = [];
        this.movements = [];
      }
    }
    else{
      this.noSavedElements = null;
    }
  }
}