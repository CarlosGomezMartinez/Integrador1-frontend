import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authSvc.userAuthenticated()){
      this.router.navigate(['profile'])
    }
  }
}
