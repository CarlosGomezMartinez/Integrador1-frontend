import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoryService {

  //API = "http://localhost:4001/category";
  API = "https://app-integrador1-backend.herokuapp.com/category";

  constructor(private http: HttpClient) { }

  getAll(userID: string): Observable<any> {
    return this.http.get(this.API+'/all/'+userID);
  }

  getAllByUser(userID: string): Observable<any> {
    return this.http.get(this.API+'/allbyuser/'+userID);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(category: any, userID: string):Observable<any>{
    category.usuario = userID;
    return this.http.post(this.API, category);
  }

  update(category: any, cateID: any):Observable<any>{
    return this.http.put(this.API+'/'+ cateID, category);
  }

  remove(id_categoria: string) {
    return this.http.delete(this.API+'/'+id_categoria);
  }
}
