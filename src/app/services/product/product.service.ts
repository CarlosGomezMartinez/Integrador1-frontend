import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {

  //  API_URI = "dirección donde está la api backend"

  constructor(private http: HttpClient) { }
}
