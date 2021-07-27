import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AcquisitionPointService {

  //PI = "http://localhost:4001/point";
  API = "https://app-integrador1-backend.herokuapp.com/point";
  
  constructor(private http: HttpClient) { }

  getAll(userID: string): Observable<any> {
    return this.http.get(this.API+'/all/'+userID);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(acquisitionPoint: any, userID: string):Observable<any>{
    acquisitionPoint.usuario = userID;
    console.log(acquisitionPoint);
    return this.http.post(this.API, acquisitionPoint);
  }

  update(point: any, pointID: any):Observable<any>{
    return this.http.put(this.API+'/'+ pointID, point);
  }

  remove(id_punto: string) {
    return this.http.delete(this.API+'/'+id_punto);
  }
}
