import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {FoodItem} from '../models/FoodItem';
import {apiUrl} from '../../environments/environment';
import { Category } from '../models/Category';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productUrl = `${apiUrl}/fooditem`;
    private productsUrl = `${apiUrl}/restaurantItems`;
    private categoryUrl = `${apiUrl}/category`;
    private categoriesUrl = `${apiUrl}/categories`;

    constructor(private http: HttpClient) {
    }

    getAllInPage(page: number, size: number): Observable<any> {
        const url = `${this.productUrl}?page=${page}&size=${size}`;
        return this.http.get(url)
            .pipe(
                 tap(_ => console.log(_)),
            )
    }

    getCategoryInPage(categoryType: number, page: number, size: number): Observable<any> {
        const url = `${this.categoryUrl}/${categoryType}?page=${page}&size=${size}`;
        return this.http.get(url).pipe(
            // tap(data => console.log(data))
        );
    }

    
    getCategories(): Observable<Category []> {
        return this.http.get<Category []>(`${this.categoriesUrl}`).pipe();
    }

    getDetail(id: String): Observable<any> {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<FoodItem>(url).pipe(
            //tap(_ => console.log(_)),
            catchError(_ => {
                console.log("Get Detail Failed");
                return of(new FoodItem());
            })
        );
    }

    getRestaurantItems(): Observable<FoodItem []> {
        return this.http.get<FoodItem []>(`${this.productsUrl}`).pipe();
    }

    update(foodItem: FoodItem): Observable<FoodItem> {
        const url = `${apiUrl}/seller/foodItem/${foodItem.id}/edit`;
        return this.http.put<FoodItem>(url, foodItem);
    }

    create(foodItem: FoodItem): Observable<FoodItem> {
        const url = `${this.productUrl}/new`;
        return this.http.post<FoodItem>(url, foodItem);
    }


    delete(foodItem: FoodItem): Observable<any> {
        const url = `${apiUrl}/foodItem/${foodItem.id}/delete`;
        return this.http.delete(url);
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
