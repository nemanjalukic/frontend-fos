import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FullOrder } from '../models/FullOrder';
import { OrderService } from '../services/order.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JwtResponse } from '../response/JwtResponse';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent implements OnInit {
  columnsToDisplay: string[] = ['id', 'customer', 'restaurant', 'price', 'date', 'status','action'];
  displayedColumns: string[] = ['item','price','quantity','category','cost'];
  dataSource: MatTableDataSource<FullOrder>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentUser: JwtResponse;
  constructor(private orderService: OrderService,private userService: UserService,) {
  }
  ngOnInit(): void {
    this.currentUser = this.userService.currentUserValue;
    this.orderService.getAll().subscribe(data=>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
    }  
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cancel(order: FullOrder) {
    this.orderService.cancel(order.id).subscribe(res => {
        if (res) {
            order.orderStatus = res.orderStatus;
        }
    });
}

finish(order: FullOrder) {
    this.orderService.finish(order.id).subscribe(res => {
        if (res) {
            order.orderStatus = res.orderStatus;
        }
    })
}

accept(order: FullOrder) {
  this.orderService.accept(order.id).subscribe(res => {
      if (res) {
          order.orderStatus = res.orderStatus;
      }
  })
}
}

