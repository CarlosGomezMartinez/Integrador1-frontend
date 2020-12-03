import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CategoryService {

  API = "http://localhost:4001/category";


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(category: any):Observable<any>{
    return this.http.post(this.API,category);
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
