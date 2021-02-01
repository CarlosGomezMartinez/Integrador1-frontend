import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConceptService } from '../../../services/concept/concept.service'
import { CategoryService } from '../../../services/category/category.service'
import { NgForm } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {
  category: any = {};
  concepts: any = [{}];
  filtro:string;
  titles = ['Concepto', 'Ver/editar', 'Eliminar'];
  successMessage: boolean = false;
  dangerMessage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private cateSrv: CategoryService,
    private concSrv: ConceptService,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(){
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.route.params.subscribe((dato)=>{
        this.cateSrv.get(dato.id_categoria).subscribe((categoria)=>{
          console.log("categoria: ", categoria);
          this.category = categoria;
          this.concSrv.getAll(dato.id_categoria).subscribe((conceptos)=>{
            console.log("conceptos: ", conceptos);
            this.concepts = conceptos;
          })
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
    this.cateSrv.update(form, this.category.id_categoria).subscribe((response)=>{
      if(response ==true){
        this.successMessage = true;
      }
      else{
        this.dangerMessage = true;
      }
    })
  }

  remove(id: string){
    this.concSrv.remove(id).subscribe((data) =>{
      if(data == true){
        var index = this.concepts.indexOf(this.concepts.filter(data => data.id_categoria == id)[0]);
        this.concepts.splice(index, 1);
      }
    });
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
