import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router'; 
import { ArticlesShoppingCartService } from '../../articles-shopping-cart.service';
import { Article } from '../../models/Article';

@Component({
  selector: 'app-input-article',
  templateUrl: './input-article.component.html',
  styleUrls: ['./input-article.component.css']
})
export class InputArticleComponent implements OnInit {
  imagen:string="";
  articulo:string="";
  material:string="";
  precio:string="";
  stock: string="";
  quantity: number=0;
  @Output() addItem:EventEmitter<any> = new EventEmitter();

  constructor(private router:Router, private cart:ArticlesShoppingCartService) {
  }

  ngOnInit(): void {
  }

  addArt(){
    let art: Article = {
      // "imagen": "./assets/img/icon.png",
      "imagen": this.imagen,
      "articulo": this.articulo,
      "material": this.material,
      "precio": parseFloat(this.precio),
      "stock": parseInt(this.stock),
      "quantity": this.quantity
    };

    this.cart.addArticle(art).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 1000);

    this.imagen= "";
    this.articulo= "";
    this.material= "";
    this.precio= "";
    this.stock= "";    
  }

}