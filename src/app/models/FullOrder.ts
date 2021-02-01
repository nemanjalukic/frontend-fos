import { Customer } from "./Customer";
import { Item } from "./Item";
import { OrderStatus } from "./OrderStatus";
import { Restaurant } from "./Restaurant";


export class FullOrder {
    id:number;
    customer:Customer;
    restaurant:Restaurant;
    orderStatus:OrderStatus;
    finalPrice:number;
    orderItems:Item [];
    orderTime:Date;


}