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
    return this.http.get(`${SERVER_URL}?_sort=purchased,name&_order=asc,asc`);
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

  getAllByWeek(date): Observable<any> {
    const dataStart = this.getFirstDayOfTheWeek(date).toISOString();
    const dataEnd = this.getLastDayOfTheWeek(date).toISOString();
    return this.http.get(`${SERVER_URL}?date_gte=${dataStart}&date_lte=${dataEnd}&_sort=purchased,name&_order=asc,asc`);
  }

  getFirstDayOfTheWeek(date): any {
    const otherDate = new Date(date);
    otherDate.setHours(0);
    otherDate.setSeconds(0);
    otherDate.setMinutes(0);
    const day = otherDate.getDay();
    const diff = otherDate.getDate() - day;
    return new Date(otherDate.setDate(diff));
  }

  getLastDayOfTheWeek(date): any {
    const lastDay = new Date();
    lastDay.setDate(this.getFirstDayOfTheWeek(date).getDate() + 7)
    return lastDay;
  }
}
