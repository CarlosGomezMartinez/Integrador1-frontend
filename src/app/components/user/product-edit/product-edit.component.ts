import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  products: any = {};
  id_categoria: string;
  id_concepto: string;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private prodSrv: ProductService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params =>{
      this.id_categoria = params.id_categoria;
      this.id_concepto = params.id_concepto;
      this.prodSrv.get(params.id_producto).subscribe((product) =>{
        console.log(product)
        this.products = product;
      })
    });
    /*this.route.params.subscribe((dato)=>{
      this.cateSrv.get(dato.id_categoria).subscribe((categoria)=>{
        console.log("categoria: ", categoria);
        this.category = categoria;
        this.concSrv.getAll(dato.id_categoria).subscribe((conceptos)=>{
          console.log("conceptos: ", conceptos);
          this.concepts = conceptos;
        })
      })
    });*/
  }

  update(form: NgForm){
    console.log("Producto: ", this.products);
    console.log("form: ", form);
    console.log(this.products.id_producto_servicio)
    this.prodSrv.update(form, this.products.id_producto_servicio).subscribe(respuesta=>{
      alert(respuesta);
    })
  }

}
