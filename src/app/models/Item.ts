import {FoodItem} from "./FoodItem";

export class Item {
    id:number;
    quantity: number;
    foodItem: FoodItem;
    price: number;

    constructor(foodItem:FoodItem, quantity = 1){
        this.foodItem=foodItem;
        this.quantity=quantity;

    }

}
