import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConceptService } from '../../../services/concept/concept.service'
import { CategoryService } from '../../../services/category/category.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {
  category: any = {};
  concepts: any = [{}];

  constructor(
    private route: ActivatedRoute,
    private cateSrv: CategoryService,
    private concSrv: ConceptService
  ) { }

  ngOnInit(){
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

  update(form: NgForm){
    console.log("categoria: ", this.category);
    console.log("form: ", form);
    this.cateSrv.update(form,this.category.id_categoria).subscribe(respuesta=>{
      alert(respuesta);
    })
  }

}
