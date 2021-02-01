import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { Role } from './enum/Role';
import { HomeComponent } from './home/home.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { LoginComponent } from './login/login.component';
import { NewFoodItemComponent } from './new-food-item/new-food-item.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
{path:'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'home', component:HomeComponent},
{path:'cart', component:CartComponent},
{path: 'product/:id', component:ItemDetailComponent},
{path: 'addFoodItem', component:NewFoodItemComponent, canActivate: [AuthGuard],
data: {roles: [Role.Restaurant]}},
{path: 'foodItems', component:RestaurantItemsComponent, canActivate: [AuthGuard],
data: {roles: [Role.Restaurant]}},
{
  path: 'orders',
  component: OrdersComponent,
  canActivate: [AuthGuard]
},
{ path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
