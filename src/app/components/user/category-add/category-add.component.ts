import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category/category.service';
import firebase from "firebase/app";
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';


@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  category: any = {};
  user:any;
  successMessage: boolean = false;
  dangerMessage: boolean = false;

  constructor(
    private catSer: CategoryService,
    private authSvc:AuthService, 
    private router: Router
  ) { }
  
  ngOnInit():void{
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }
    else{
      this.user = JSON.parse(localStorage.getItem('user'))[0];
    }
  }

  save(form: NgForm){
    if(this.successMessage){
      this.successMessage = false;
    }
    if(this.dangerMessage){
      this.dangerMessage = false;
    }
    if (this.user != null) {
      this.catSer.save(form, this.user.uid).subscribe((response)=>{
        if(response == true){
          this.successMessage = true;
        }
        else{
          this.dangerMessage = true;
        }
      })
    }
  }
  closeAlert(alert:string){
    if(alert == 'success'){
      this.successMessage = false;
    }
    else{
      this.dangerMessage = false;
      }
  }
}
