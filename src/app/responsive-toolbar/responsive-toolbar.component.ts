import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from '../enum/Role';
import { JwtResponse } from '../response/JwtResponse';
import { UserService } from '../services/user.service';
import { ToolbarMenuItem } from './toolbar-menu-item';


@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit, OnDestroy {
  isLoggedIn=false;
  showToCustomer=false;
  username?: string;

  menuItems: ToolbarMenuItem[] = [
    {
      label: 'Orders',
      icon: 'shop',
      link: '/orders',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      showOnLoggedIn: true
    },
    {
      label: 'Register',
      icon: 'person_add',
      link: '/register',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      showOnLoggedIn: false
    },
    {
      label: 'Login',
      icon: 'login',
      link: '/login',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      showOnLoggedIn: false
    }
  ];
  currentUserSubscription: Subscription;
  name$;
  name: string;
  currentUser: JwtResponse;
  root = '/';
  Role = Role;

  constructor(private userService: UserService, private router: Router
  ) {

  }


  ngOnInit() {
      //this.name$ = this.userService.name$.subscribe(aName => this.name = aName);
      this.currentUserSubscription = this.userService.currentUser.subscribe(user => {
          this.currentUser = user;
          if (!user || user.role == Role.Customer) {
              this.root = '/';
          } else {
              this.root = '/seller';
          }
          if(user){
            this.isLoggedIn=true;
            this.name=user.name;
          }
      });
  }

  ngOnDestroy(): void {
      this.currentUserSubscription.unsubscribe();
      // this.name$.unsubscribe();
  }

  logout() {
      this.userService.logout();
      this.isLoggedIn=false;
      this.router.navigate(['/login'], {queryParams: {logout: 'true'}} );
  }
   
  }


