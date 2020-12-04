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
  //userID: any;

  constructor(
    private catSer: CategoryService, 
    private authSvc: AuthService
  ) { }
  ngOnInit():void{
  }

  save(form: NgForm){
    console.log(this.category)
    var user = firebase.auth().currentUser;
    if (user != null) {
      this.catSer.save(form, user.uid).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
