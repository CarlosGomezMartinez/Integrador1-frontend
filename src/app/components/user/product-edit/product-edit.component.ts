import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/services/auth/auth.service';

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
  successMessage: boolean = false;
  dangerMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private prodSrv: ProductService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.sub = this.route.params.subscribe(params =>{
        this.id_categoria = params.id_categoria;
        this.id_concepto = params.id_concepto;
        this.prodSrv.get(params.id_producto).subscribe((product) =>{
          this.products = product;
        })
      });
    }
  }

  update(form: NgForm){
    if(this.successMessage){
      this.successMessage = false;
    }
    if(this.dangerMessage){
      this.dangerMessage = false;
    }
    this.prodSrv.update(form, this.products.id_producto_servicio).subscribe((response)=>{
      if(response ==true){
        this.successMessage = true;
      }
      else{
        this.dangerMessage = true;
      }
    })
  }

  closeAlert(alert:string){
    if(alert == 'success'){
      this.successMessage = false;
    }
    else{
      this.dangerMessage = false;
      }
  }

}
