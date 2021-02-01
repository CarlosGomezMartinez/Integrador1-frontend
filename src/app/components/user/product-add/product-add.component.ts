import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../services/product/product.service';

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
  successMessage: boolean = false;
  dangerMessage: boolean = false;
  user:any;

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
    else {
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      this.sub = this.route.params.subscribe(params =>{
        this.id_categoria = params.id_categoria;
        this.id_concepto = params.id_concepto;
      });
    }
  }

  save(form: NgForm){
    if(this.successMessage){
      this.successMessage = false;
    }
    if(this.dangerMessage){
      this.dangerMessage = false;
    }
    this.prodSrv.save(form, this.user.uid, this.id_categoria, this.id_concepto).subscribe((response)=>{
      if(response == true){
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
