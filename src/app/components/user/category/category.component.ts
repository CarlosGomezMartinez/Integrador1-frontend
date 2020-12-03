import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any = [{}];
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
}
