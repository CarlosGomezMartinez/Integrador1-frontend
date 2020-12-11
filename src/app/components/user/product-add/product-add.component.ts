import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  id_categoria: string;
  id_concepto: string;
  sub: Subscription;
  concept: any = {};
  products: any = [{}];

  constructor(
    private route: ActivatedRoute,
    private concSrv: ConceptService,
    private prodSrv: ProductService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params =>{
      this.id_categoria = params.id_categoria;
      this.id_concepto = params.id_concepto;
    });
  }

  save(form: NgForm){
    console.log("form ",form)
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.prodSrv.save(form, user.uid, this.id_categoria, this.id_concepto).subscribe((data)=>{
        console.log(data);
      })
    }
  }

}
