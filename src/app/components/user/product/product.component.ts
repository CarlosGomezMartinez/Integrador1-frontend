import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConceptService } from '../../../services/concept/concept.service';
import { ProductService } from '../../../services/product/product.service';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id_categoria: string;
  concept: any = {};
  products: any = [{}];
  titles = ['Producto', 'Ver/editar', 'Eliminar'];
  successMessage: boolean = false;
  dangerMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private concSrv: ConceptService,
    private prodSrv: ProductService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.route.params.subscribe((dato) =>{
        this.id_categoria = dato.id_categoria;
        this.concSrv.get(dato.id_concepto).subscribe((concepto)=>{
          console.log("concepto: ", concepto);
          this.concept = concepto;        
        });

        this.prodSrv.getAll(dato.id_concepto).subscribe((products)=>{
          console.log("productos",products)
          this.products = products;
        });
      });
    }
  }

  remove(id: string){
    this.prodSrv.remove(id).subscribe((data) =>{
      if(data == true){
        var index = this.products.indexOf(this.products.filter(data => data.id_categoria == id)[0]);
        this.products.splice(index, 1);
      }
    });
  }

  update(form: NgForm){
    if(this.successMessage){
      this.successMessage = false;
    }
    if(this.dangerMessage){
      this.dangerMessage = false;
    }
    this.concSrv.update(form, this.concept.id_concepto).subscribe((response)=>{
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
