import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../models/FoodItem';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input()
  item:FoodItem;
  constructor() { }

  ngOnInit(): void {
  }

}
