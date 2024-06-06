import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Article } from '../../models/Article';
import { ArticlesShoppingCartService } from '../../articles-shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shopList$: Observable<Article[]>;
  constructor(private cart: ArticlesShoppingCartService){
    this.shopList$ = cart.shopList.asObservable();
  }

  ngOnInit(): void {
  }

}
