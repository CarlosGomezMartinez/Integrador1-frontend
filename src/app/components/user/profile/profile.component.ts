import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authSvc:AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if(!this.authSvc.userAuthenticated()){
      this.router.navigate(['login'])
    }

    /* let datos = {
      queryType: 'consultaFecha', 
      selectionType:'categoría', 
      objectSelectionType: 31, 
      selectedPoint:45, 
      pointCharacteristicType: 'producto', 
      pointCharacteristicValue: 5,
      startDate: '2021-01-05',
      finishDate: '2021-07-17',
      range: false,
      startOptionalDate: '2021-01-05',
      finishOptionalDate: '2021-07-16',
      totalPerMonth: true,
      totalCost: true,
      variation: true
    }
    localStorage.setItem('datos', JSON.stringify(datos)); */
  }

}
