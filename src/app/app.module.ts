import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResponsiveToolbarComponent } from './responsive-toolbar/responsive-toolbar.component';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './_interceptors/jwt-interceptor.service';
import { ErrorInterceptor } from './_interceptors/error-interceptor.service';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CartComponent } from './cart/cart.component';
import { NewFoodItemComponent } from './new-food-item/new-food-item.component';
import { OrdersComponent } from './orders/orders.component';
import { RestaurantItemsComponent } from './restaurant-items/restaurant-items.component';

@NgModule({
  declarations: [
    AppComponent,
    ResponsiveToolbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ItemComponent,
    ItemDetailComponent,
    CartComponent,
    NewFoodItemComponent,
    OrdersComponent,
    RestaurantItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
