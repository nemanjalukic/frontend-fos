import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {Order} from "../models/Order";
import {apiUrl} from "../../environments/environment";
import { FullOrder } from '../models/FullOrder';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderUrl = `${apiUrl}/order`;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<FullOrder []> {
        return this.http.get<FullOrder []>(`${this.orderUrl}`).pipe();
    }

    cancel(id): Observable<FullOrder> {
        return this.http.patch<Order>(`${this.orderUrl}/cancel/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }

    finish(id): Observable<FullOrder> {
        return this.http.patch<Order>(`${this.orderUrl}/finish/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }

    accept(id): Observable<FullOrder> {
        return this.http.patch<Order>(`${this.orderUrl}/accept/${id}`, null).pipe(
            catchError(_ => of(null))
        );
    }
}
