import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  constructor() { }
  public holas = [{id: 5, nombre: 'Julian'}, {id: 8, nombre: 'Carlos'}];
  ngOnInit(): void {
    console.log(this.holas);
  }

}
