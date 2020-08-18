import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const SERVER_URL = 'https://my-json-server.typicode.com/Bruno-Bernardo/Shopping-List/items';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(SERVER_URL);
  }

  get(id): Observable<any> {
    return this.http.get(`${SERVER_URL}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(SERVER_URL, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(SERVER_URL + '/' + id, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${SERVER_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(SERVER_URL);
  }

  findByName(name): Observable<any> {
    return this.http.get(`${SERVER_URL}?name=${name}`);
  }
}
