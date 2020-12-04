import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConceptService } from '../../../services/concept/concept.service';
import { AuthService } from '../../../services/auth/auth.service';
import firebase from "firebase/app";


@Component({
  selector: 'app-concept-add',
  templateUrl: './concept-add.component.html',
  styleUrls: ['./concept-add.component.scss']
})
export class ConceptAddComponent implements OnInit {
  concept: any = {};
  //userID: any;

  constructor(
    private concSrv: ConceptService
  ) { }
  ngOnInit():void{
  }

  save(form: NgForm){
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.concSrv.save(form, user.uid).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}