import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';
import { Customer } from '../models/Customer';
import { FoodItem } from '../models/FoodItem';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-food-item',
  templateUrl: './new-food-item.component.html',
  styleUrls: ['./new-food-item.component.css']
})
export class NewFoodItemComponent implements OnInit {

  item:FoodItem;
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';
  categories: Category [];

  
  constructor(private productService:ProductService,private router: Router) { }

  ngOnInit(): void {

    this.item=new FoodItem();
    this.productService.getCategories().subscribe(data=>
      {
        this.categories=data;
      }
      );
  }

  onSubmit() {
    console.log(this.item);
    this.productService.create(this.item).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isFailed = false;
          this.router.navigate(['/foodItems']);
        },
        err => {
          console.log(err);
          this.errorMessage = err.message;
          this.isFailed = true;
        }
        );
  }

}
