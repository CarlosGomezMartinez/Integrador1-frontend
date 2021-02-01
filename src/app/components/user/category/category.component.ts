import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
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
  titles = ['Categoría','Ver/editar', 'Eliminar'];
  user:any;

  constructor(
    private catSer: CategoryService,
    private authSvc:AuthService, 
    private router: Router
  ) { }
  
  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
      this.catSer.getAll(this.user.uid).subscribe(data => {
        this.categories = data;
      });
    }
  }

  remove(id: string){
    this.catSer.remove(id).subscribe((data) =>{
      if(data == true){
        var index = this.categories.indexOf(this.categories.filter(data => data.id_categoria == id)[0]);
        this.categories.splice(index, 1);
      }
      else{
        console.log(data);
      }
    });
  }

}