import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {MatSort} from '@angular/material/sort';

export class Tab {
  label: string;
  items: [];

  constructor(private apiService: ApiService, label: string, private itemsMethod: any) {
    this.label = label;
    this.loadItems();
  }

  loadItems(): void {
    this.itemsMethod
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
      new Tab(apiService, 'Week', this.apiService.getAllByWeek(new Date())),
      new Tab(apiService, 'All', this.apiService.getAll())
    ];
  }

  ngOnInit(): void {
    this.retrieveItems();
  }

  loadItems(): void {
    this.items = this.retrieveItems();
    this.itemsWeek = this.retrieveItems();
    this.tabs.forEach(tab => tab.loadItems());
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

  brandsNames(item): any {
    return item.brands.map(b => b.name).join(',');
  }
}
