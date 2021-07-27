import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductService {

  //API = "http://localhost:4001/product";
  API = "https://app-integrador1-backend.herokuapp.com/product";
  constructor(private http: HttpClient) { }

  getAll(id_concepto: string): Observable<any> {
    return this.http.get(this.API + '/all/' + id_concepto);
  }

  getAllByUser(userID: string): Observable<any> {
    return this.http.get(this.API+'/allbyuser/'+userID);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(product: any, userID: string, cateID: string, concID: string):Observable<any>{
    product.usuario = userID;
    product.id_concepto = concID;
    product.id_categoria = cateID;
    console.log(product);
    return this.http.post(this.API, product);
  }

  remove(id_product: string) {
    return this.http.delete(this.API+ '/' + id_product);
  }

  update(product: any, prodID: any):Observable<any>{
    return this.http.put(this.API+'/'+prodID, product);
  }
}
