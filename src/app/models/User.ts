import {Role} from "../enum/Role";

export class User {

    email: string;

    password: string;

    username: string;

    restaurantName: string;

    firstName: string;

    lastName: string;

    phone: string;

    address: string;

    active: boolean;

    role: string;

    constructor(){
        this.active = true;
    }
}
