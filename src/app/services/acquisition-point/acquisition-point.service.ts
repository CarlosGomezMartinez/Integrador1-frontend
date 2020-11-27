import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AcquisitionPointService {

  //  API_URI = "dirección donde está la api backend"

  constructor(private http: HttpClient) { }
}
