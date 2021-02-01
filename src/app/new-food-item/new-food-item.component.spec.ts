import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFoodItemComponent } from './new-food-item.component';

describe('NewFoodItemComponent', () => {
  let component: NewFoodItemComponent;
  let fixture: ComponentFixture<NewFoodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFoodItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
