import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute,} from '@angular/router';
import { ConceptService } from '../../../services/concept/concept.service';

import firebase from "firebase/app";


@Component({
  selector: 'app-concept-add',
  templateUrl: './concept-add.component.html',
  styleUrls: ['./concept-add.component.scss']
})
export class ConceptAddComponent implements OnInit {
  concept: any = {};
  sub: Subscription;
  id_categoria: any;
  public user = JSON.parse(localStorage.getItem('user'))[0];

  constructor(
    private concSrv: ConceptService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(){
    this.sub = this.activatedRoute.params.subscribe(params =>{
      this.id_categoria = params.id_categoria;
    });
  }

  save(form: NgForm){
    if (this.user != null) {
      this.concSrv.save(form, this.user.uid, this.id_categoria).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}