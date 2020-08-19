import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  itemForm = this.fb.group({
    name: ['', Validators.required],
    quantity: ['']
  });
  item = {
    name: '',
    quantity: 1,
    date: null,
    purchased: false,
    brands: []
  };
  submitted = false;
  newBrand = '';

  addBrand(event: KeyboardEvent): void {
    if (event.key === ' ') {
      const data = {name: this.newBrand, selected: false};
      this.item.brands.push(data);
      this.newBrand = '';
    }
  }

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  saveItem(): void {
    const data = {
      name: this.item.name,
      quantity: this.item.quantity,
      date: new Date().toISOString(),
      purchased: this.item.purchased,
      brands: this.item.brands
    };

    this.apiService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/items']);
        },
        error => {
          console.log(error);
        });
  }

  onSubmit(): void {
    this.submitted = true;
    this.saveItem();
  }
}
