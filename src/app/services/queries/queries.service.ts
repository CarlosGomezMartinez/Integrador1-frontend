import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  API = "http://localhost:4001/report";
  //API = "https://app-integrador1-backend.herokuapp.com/report";

  constructor(private http: HttpClient) { }

  public getByType(userID: string, infoQuery: any):Observable<any>{
    return this.http.put(this.API+'/reportbytype/'+userID, infoQuery);
  }

  public getByPoint(userID: string, infoQuery: any):Observable<any>{
    return this.http.put(this.API+'/reportbypoint/'+userID, infoQuery);
  }

  public getByDate(userID: string, infoQuery: any):Observable<any>{
    return this.http.put(this.API+'/reportbydate/'+userID, infoQuery);
  }
}
