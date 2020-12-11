import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import firebase from "firebase/app";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any = [{}];
  filtro: string;
  categoriesFound: any = [{}];

  constructor(
    private catSer: CategoryService
  ) { }
  
  ngOnInit(): void {
    var user = firebase.auth().currentUser;
    this.catSer.getAll(user.uid).subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  remove(id: string){
    this.catSer.remove(id).subscribe(data =>{
      var index = this.categories.indexOf(this.categories.filter(data => data.id_categoria == id)[0]);
      this.categories.splice(index, 1);
      console.log(data);
    });
  }

}