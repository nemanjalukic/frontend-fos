import { Item } from "./Item";
import { Restaurant } from "./Restaurant";

export class Order {

    user:string;
    restaurantUsername:String;
    items: Item[]=[];
    restaurant:string;
    finalPrice:number;


    constructor(item: Item){
        this.restaurantUsername=item.foodItem.restaurant.username;
        this.restaurant=item.foodItem.restaurant.name;
        this.items.push(item);
        this.finalPrice=item.foodItem.price*item.quantity;
    }


    add(item:Item){
       let index= this.items.findIndex(e=>e.foodItem.id===item.foodItem.id);
       if(index===-1){
        this.items.push(item); 
       }
       else{
           this.items[index].quantity+=item.quantity;
       }
       this.finalPrice+=item.foodItem.price*item.quantity;

    }
    update(item:Item){
        let index= this.items.findIndex(e=>e.foodItem.id===item.foodItem.id);
        this.items[index]=item;
        this.finalPrice=this.items.reduce((acum,i)=> acum+i.quantity*i.foodItem.price,0);

    }
    calculate(){
        this.finalPrice=this.items.reduce((acum,i)=> acum+i.quantity*i.foodItem.price,0);

    }

}
