import { Category } from "./Category";
import { Restaurant } from "./Restaurant";

export class FoodItem {
    id: number;
    name: string;
    price: number;
    description: string;
    picture: string;
    category:Category;
    restaurant:Restaurant;

    constructor(){}
    
}


