import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../services/category/category.service';
import { AuthService } from '../../../services/auth/auth.service';
import firebase from "firebase/app";


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  category: any = {};
  user: any={}

  constructor(
    private catSer: CategoryService, 
    private authSvc: AuthService
  ) { }
  ngOnInit(): void {
    var user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log(user);
        this.user = user;
      } else {
        // No user is signed in.
        console.log("No hay nadie logueado");
      }
    });
  }

  save(form: NgForm){
    
    this.catSer.save(form).subscribe((data)=>{
      console.log(data);
    })
    
    /*this.catSer.save(form, this.user$).subscribe(result => {}, 
      error => console.error(error)
    );*/

  }
}
