import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {apiUrl} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Cart} from '../models/Cart';
import {Item} from '../models/Item';
import {JwtResponse} from '../response/JwtResponse';
import { Order } from '../models/Order';

@Injectable({
    providedIn: 'root'
})
export class CartService {


    private cartUrl = `${apiUrl}/cart`;

    localMap : Order[];


    /*private itemsSubject: BehaviorSubject<Item[]>;
    private totalSubject: BehaviorSubject<number>;
    public items: Observable<Item[]>;
    public total: Observable<number>;*/


    private currentUser: JwtResponse;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private userService: UserService) {
        /*this.itemsSubject = new BehaviorSubject<Item[]>(null);
        this.items = this.itemsSubject.asObservable();
        this.totalSubject = new BehaviorSubject<number>(null);
        this.total = this.totalSubject.asObservable();*/
        this.userService.currentUser.subscribe(user => this.currentUser = user);


    }

    private getLocalCart(): Order[] {
        if (this.cookieService.check('cart')) {
            this.localMap = JSON.parse(this.cookieService.get('cart'));
            return this.localMap;
            //return Object.values(this.localMap);
        } else {
            this.localMap = [];
            return [];
        }
    }

    getCart(): Observable<Order[]> {
        //this.clearLocalCart()
        const localCart = this.getLocalCart();
        return of(localCart);
    }

    addItem(itemInOrder): Observable<boolean> {
            if (this.cookieService.check('cart')) {
                this.localMap = JSON.parse(this.cookieService.get('cart'));
            }
            console.log(this.localMap);
            let index=this.localMap.findIndex(e=>e.restaurantUsername===itemInOrder.foodItem.restaurant.username);
            if (index===-1) {
                this.localMap.push(new Order(itemInOrder));
            } else {
                let ord=new Order(itemInOrder);
                ord.items=this.localMap[index].items;
                ord.finalPrice=this.localMap[index].finalPrice;
                //ord.numbOfItems=this.localMap[index].numbOfItems;
                ord.add(itemInOrder);
                this.localMap[index]=ord;
            }
            this.cookieService.set('cart', JSON.stringify(this.localMap));
            return of(true);
    }

    update(itemInOrder): Observable<Item> {

        if (this.currentUser) {
            const url = `${this.cartUrl}/${itemInOrder.itemId}`;
            return this.http.put<Item>(url, itemInOrder.count);
        }
    }


    remove(order) {
          this.localMap=this.localMap.filter(e => e.restaurantUsername!==order.restaurantUsername);
          this.cookieService.set('cart', JSON.stringify(this.localMap));
          return of(null);
        
    }


    checkout(order:Order): Observable<any> {
        console.log(order.items)
        const url = `${this.cartUrl}`;
        return this.http.post<any>(url,order.items);
    }

    storeLocalCart() {
        this.cookieService.set('cart', JSON.stringify(this.localMap));
        return of(null);
    }

    clearLocalCart() {
        console.log('clear local cart');
        this.cookieService.delete('cart');
        this.localMap = [];
    }

}
