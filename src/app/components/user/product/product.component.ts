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
  concept: any = {};
  products: any = [{}];
  constructor(
    private route: ActivatedRoute,
    private concSrv: ConceptService,
    private prodSrv: ProductService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((dato) =>{
      this.concSrv.get(dato.id_concepto).subscribe((concepto)=>{
        console.log("concepto: ", concepto);
        this.concept = concepto;
        
      })
    })
  }

}
