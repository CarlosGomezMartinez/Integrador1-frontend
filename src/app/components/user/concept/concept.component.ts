import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {

  constructor() { }

  public holas = [{id: 10, nombre: 'Alejo'}, {id: 16, nombre: 'Naty'}];
  ngOnInit(): void {
    console.log(this.holas);
  }

}
