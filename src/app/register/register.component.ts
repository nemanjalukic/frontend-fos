import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../enum/Role';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles: any = [{id:Role.Customer, view: "Customer"}, {id:Role.Restaurant, view: "Restaurant"}];
  hide = true;
  user: User;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor( private userService: UserService,
               private router: Router) {
    this.user = new User();

  }



  ngOnInit() {


  }
  onSubmit() {
    this.userService.signUp(this.user).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          this.errorMessage = err.message;
          this.isSignUpFailed = true;
        }
        );
  }

}


