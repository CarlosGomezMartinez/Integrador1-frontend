import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private catSer: CategoryService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.catSer.getAll().subscribe(data => {
      console.log(data);
      this.categories = data;
    });
  }

  remove(id: string){
    console.log(id)
    this.catSer.remove(id).subscribe(data =>{
      window.location.reload();
      console.log(data);
    });
  }

  searchCategory(){
    this.categoriesFound = [];
    let nameCategory = (<HTMLInputElement> document.getElementById('buscar')).value.toLowerCase();
    let found = false;
    for(let category of this.categories){
      if (category.nombre_categoria.toLowerCase() == nameCategory){
        found = true;
        this.categoriesFound.push(category);
      }
    }
    if(found){
      //alert("encontrado");
    }
    else{
      alert("No se encontró ninguna categoría con ese nombre");
    }
    location.reload();
  }

  inputEmpty(){
    let nameCategory = (<HTMLInputElement> document.getElementById('buscar')).value;
    if(nameCategory == ""){
      return true;
    }
    return false;
  }
}