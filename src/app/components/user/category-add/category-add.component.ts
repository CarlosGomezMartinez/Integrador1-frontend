import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import firebase from "firebase/app";


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  category: any = {};
  public user = JSON.parse(localStorage.getItem('user'))[0];

  constructor(
    private catSer: CategoryService
  ) { }
  
  ngOnInit():void{
  }

  save(form: NgForm){
    if (this.user != null) {
      this.catSer.save(form, this.user.uid).subscribe((data)=>{
        console.log(data);
      })
    }
  }
}
