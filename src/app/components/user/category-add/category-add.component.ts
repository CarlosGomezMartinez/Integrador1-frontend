import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../services/category/category.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  category: any = {};
  constructor(private catSer: CategoryService, private authSvc: AuthService) { }
  ngOnInit(): void {

  }

  save(form: NgForm){
    
    /*this.catSer.save(form, this.user$).subscribe(result => {}, 
      error => console.error(error)
    );*/
  }
}
