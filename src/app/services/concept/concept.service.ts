import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ConceptService {

  API = "http://localhost:4001/concept";


  constructor(private http: HttpClient) { }

  getAll(id_categoria: string): Observable<any> {
    return this.http.get(this.API+ '/all/'+id_categoria);
  }

  get(id: string) {
    return this.http.get(this.API + '/' + id);
  }

  save(concept: any, userID: string, category: string):Observable<any>{
    concept.usuario = userID;
    concept.id_categoria = category;
    console.log(concept);
    return this.http.post(this.API, concept);
  }

  remove(id_categoria: string) {
    return this.http.delete(this.API+'/'+id_categoria);
  }
}
