import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    gridColumns = 5;
    title: string;
    page: any;
    breakpoint: number = 3;  //to adjust to screen
    current=0;
    length: number = 0;
    pageSize: number = 5;  //displaying three cards each row
    pageSizeOptions: number[] = [5, 10, 15, 25];
  
  
    constructor(private productService: ProductService,
                private route: ActivatedRoute) {
  
    }
  
  
    ngOnInit() {
      this.getProds();
    }
  
    getProds(page: number = 0, size: number = this.pageSize) {
      if (this.route.snapshot.url.length == 1) {
        this.productService.getAllInPage(+page, +size)
          .subscribe(page => {
            this.page = page;
            this.length=page.totalElements;
            this.title = 'Get Whatever You Want!';
          });
      } else { //  /category/:id
        const type = this.route.snapshot.url[1].path;
        this.productService.getCategoryInPage(+type, page, size)
          .subscribe(categoryPage => {
            this.title = categoryPage.category;
            this.page = categoryPage.page;
          });
      }
    }

    public getServerData(event?:PageEvent){
      this.current = event.pageIndex;
      this.pageSize = event.pageSize;
      this.getProds(this.current,this.pageSize);
    }

}
