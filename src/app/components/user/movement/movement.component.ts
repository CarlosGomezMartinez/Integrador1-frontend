import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  contactForm:FormGroup;
 
  /*categories = [
    { id_categoria: 1, nombre_categoria: "United States" },
    { id_categoria: 2, nombre_categoria: "Australia" },
    { id_categoria: 3, nombre_categoria: "Canada" },
    { id_categoria: 4, nombre_categoria: "Brazil" },
    { id_categoria: 5, nombre_categoria: "England" }
  ];*/

  categories  = [];
  concepts: any;
  products: any;
  adquisitionPoints: any;
  constructor( private fb:FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      category: [null]
    });
  }

  submit() {
    console.log("Form Submitted")
    console.log(this.contactForm.value)
  }

}
