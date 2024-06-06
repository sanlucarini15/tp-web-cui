import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumberComponent implements OnInit {

  constructor() {
    this.quantity= 0;
    this.max;
  }

  @Input()
  quantity: number = 0;

  @Input()
  max: number = 0;

  @Output()
  quantityChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  maxReached: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.quantity= 0;
  }

  upQuantity(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
    else
      this.maxReached.emit("se alcanzó el máximo");
  }

  downQuantity(): void {
    if (this.quantity > 0)
      this.quantity--;
      this.quantityChange.emit(this.quantity);
  }

  changeQuantity(event: any): void {
    console.log(event.key);
    this.quantityChange.emit(this.quantity);
  }
}
