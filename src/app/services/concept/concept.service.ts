import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConceptService {

  //  API_URI = "dirección donde está la api backend"

  constructor(private http: HttpClient) { }
}