import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router,} from '@angular/router';
import { ConceptService } from '../../../services/concept/concept.service';

import firebase from "firebase/app";
import { AuthService } from '@app/services/auth/auth.service';


@Component({
  selector: 'app-concept-add',
  templateUrl: './concept-add.component.html',
  styleUrls: ['./concept-add.component.scss']
})
export class ConceptAddComponent implements OnInit {
  concept: any = {};
  sub: Subscription;
  id_categoria: any;
  successMessage: boolean = false;
  dangerMessage: boolean = false;
  user: any;

  constructor(
    private concSrv: ConceptService,
    private activatedRoute: ActivatedRoute,
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(){
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else {
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      this.sub = this.activatedRoute.params.subscribe(params =>{
        this.id_categoria = params.id_categoria;
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
    this.concSrv.save(form, this.user.uid, this.id_categoria).subscribe((response)=>{
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