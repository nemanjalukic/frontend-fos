import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from '../models/FoodItem';
import { Item } from '../models/Item';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  count: number;
  item: FoodItem;

  constructor(
      private productService: ProductService,
      private cartService: CartService,
      private route: ActivatedRoute,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.getProduct();
    this.count = 1;
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getDetail(id).subscribe(
        prod => {
          console.log(prod)
          this.item = prod;
        },
        _ => console.log('Get Cart Failed')
    );
  }

  addToCart() {
    this.cartService
        .addItem(new Item(this.item, this.count))
        .subscribe(
            res => {
              if (!res) {
                console.log('Add Cart failed' + res);
                throw new Error();
              }
              this.router.navigateByUrl('/cart');
            },
            _ => console.log('Add Cart Failed')
        );
  }

}
