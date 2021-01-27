import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any = [{}];
  filtro: string;
  categoriesFound: any = [{}];
  public user = JSON.parse(localStorage.getItem('user'))[0];

  constructor(
    private catSer: CategoryService
  ) { }
  
  ngOnInit(): void {
    this.catSer.getAll(this.user.uid).subscribe(data => {
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