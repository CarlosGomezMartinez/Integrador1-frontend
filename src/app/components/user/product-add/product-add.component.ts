import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  public user = JSON.parse(localStorage.getItem('user'))[0];

  constructor(
    private route: ActivatedRoute,
    private prodSrv: ProductService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params =>{
      this.id_categoria = params.id_categoria;
      this.id_concepto = params.id_concepto;
    });
  }

  save(form: NgForm){
    if (this.user != null) {
      this.prodSrv.save(form, this.user.uid, this.id_categoria, this.id_concepto).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
