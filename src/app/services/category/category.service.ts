import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {

  API = "dirección donde está la api backend";


  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.API);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(category: any): Observable<any> {
    let result: Observable<Object>;
    console.log("borro ", category);
    if (category['href']) {
      result = this.http.put(category.href, category);
    } else {
      result = this.http.post(this.API, category);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
