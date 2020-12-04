import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private concSrv: ConceptService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.sub = this.activatedRoute.params.subscribe(params =>{
      this.id_categoria = params.id_categoria;
    });
  }

  save(form: NgForm){
    console.log("form ",form)
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.concSrv.save(form, user.uid, this.id_categoria).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}