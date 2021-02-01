import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Role } from '../enum/Role';
import { Item } from '../models/Item';
import { Order } from '../models/Order';
import { JwtResponse } from '../response/JwtResponse';
import { CartService } from '../services/cart.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CartComponent implements OnInit, OnDestroy{
  

  columnsToDisplay = ['restaurant', 'numbOfItems', 'finalPrice', 'action'];
  displayedColumns: string[] = ['item','price','quantity','category','cost','action'];
  productInOrders : Order[]= [];
  total = 0;
  currentUser: JwtResponse;
  userSubscription: Subscription;
  sub: Subscription;

  constructor(private cartService: CartService,
              private userService: UserService,
              private router: Router) {
      this.userSubscription = this.userService.currentUser.subscribe(user => this.currentUser = user);
  }

  getTotalCost(order:Order) {
    return order.items.reduce((acum,i)=> acum+i.quantity*i.foodItem.price,0);
  }

  ngOnInit() {
      this.cartService.getCart().subscribe(prods => {
          this.productInOrders = prods;
      });
  }

  ngOnDestroy() {
      if (!this.currentUser) {
          this.cartService.storeLocalCart();
      }
      console.log('test')
      this.userSubscription.unsubscribe();
  }

  onChange(itemInOrder) {
      let index=this.productInOrders.findIndex(e=>e.restaurantUsername===itemInOrder.foodItem.restaurant.username);
      let ord=new Order(itemInOrder);
      ord.items=this.productInOrders[index].items;
      ord.update(itemInOrder);
      this.productInOrders[index]=ord;
      console.log(this.productInOrders[index]);


  }


  remove(order:Order) {
             this.productInOrders = this.productInOrders.filter(e => e.restaurantUsername !== order.restaurantUsername);
             console.log(this.productInOrders);
             this.cartService.remove(order);
  }
  removeItem(itemInOrder:Item){
    let index=this.productInOrders.findIndex(e=>e.restaurantUsername===itemInOrder.foodItem.restaurant.username);
    this.productInOrders[index].items=this.productInOrders[index].items.filter(e=> e.foodItem.id!==itemInOrder.foodItem.id);
    if(this.productInOrders[index].items.length===0){
        this.remove(this.productInOrders[index]);
    }
    else{
        this.cartService.storeLocalCart()
    }
    
  }

  checkout(order:Order) {
      if (!this.currentUser) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: this.router.url}});
      } else if (this.currentUser.role !== Role.Customer) {
        console.log(this.currentUser);
          this.router.navigate(['/']);
      } else {
        console.log(this.currentUser);
        this.cartService.checkout(order).subscribe(data=>{ 
          console.log(data);
          this.remove(order);
          },
          err=>{
            console.log(err);
          });
      }

  }



}



export interface Transaction {
  item: string;
  cost: number;
}