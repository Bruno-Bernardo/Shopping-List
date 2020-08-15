import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {MatSort} from '@angular/material/sort';

export class Tab {
  label: string;
  items: [];

  constructor(private apiService: ApiService, label: string) {
    this.label = label;
    this.loadItems();
  }

  loadItems(): void {
    this.apiService.getAll()
      .subscribe(
        data => {
          this.items = data;
        },
        error => {
          console.log(error);
        });
  }
}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  tabs = [];
  items = [];
  itemsWeek = [];
  name = '';
  asyncTabs: Observable<Tab[]>;
  displayedColumns: string[] = ['name', 'quantity', 'actions', 'remove'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private apiService: ApiService) {
    this.tabs = [
      new Tab(apiService, 'Week'),
      new Tab(apiService, 'All')
    ];
  }

  ngOnInit(): void {
    this.retrieveItems();
  }

  loadItems(): void {
    this.items = this.retrieveItems();
    this.itemsWeek = this.retrieveItems();
    this.tabs.forEach( tab => tab.loadItems());
  }

  retrieveItems(): any {
    this.apiService.getAll()
      .subscribe(
        data => {
          this.items = data;
        },
        error => {
          console.log(error);
        });
    return this.items;
  }

  purchase(item): void {
    item.purchased = !item.purchased;
    this.apiService.update(item.id, item).subscribe(
      () => {
        this.loadItems();
        this.name = 'The item was updated successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }

  remove(item): void {
    this.apiService.delete(item.id).subscribe(
      () => {
        this.loadItems();
        this.name = 'The item was removed successfully!';
      },
      error => {
        console.log(error);
      }
    );
  }

  getFirstDayOfTheWeek(date): any {
    const otherDate = new Date(date);
    otherDate.setHours(0);
    otherDate.setSeconds(0);
    otherDate.setMinutes(0);
    const day = otherDate.getDay();
    const diff = otherDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(otherDate.setDate(diff));
  }

  getLastDayOfTheWeek(date): any {
    return new Date(date).setDate(this.getFirstDayOfTheWeek(date).getDate() + 7);
  }
}
