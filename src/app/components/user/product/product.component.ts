import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id_categoria: string;
  concept: any = {};
  products: any = [{}];
  constructor(
    private route: ActivatedRoute,
    private concSrv: ConceptService,
    private prodSrv: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((dato) =>{
      this.id_categoria = dato.id_categoria;
      this.concSrv.get(dato.id_concepto).subscribe((concepto)=>{
        console.log("concepto: ", concepto);
        this.concept = concepto;        
      })
      this.prodSrv.getAll(dato.id_concepto).subscribe((products)=>{
        console.log("productos",products)
        this.products = products;
      })
    })
  }
  remove(id: string){
    console.log(id)
    this.prodSrv.remove(id).subscribe(data =>{
      window.location.reload();
      console.log(data);
    });
  }

  update(form: NgForm){
    console.log("concepto: ", this.concept);
    console.log("form: ", form);
    this.concSrv.update(form, this.concept.id_concepto).subscribe(respuesta=>{
      console.log(this.concept)
      alert(respuesta);
    })
  }
}
