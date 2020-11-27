import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories: any = [{}]
  constructor(private catSer: CategoryService) { }

  ngOnInit(): void {
    this.catSer.getAll().subscribe(data => {
      this.categories = data;
    });
  }
}
