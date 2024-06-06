import { Component, OnInit } from '@angular/core';
import { ArticlesShoppingCartService } from '../../articles-shopping-cart.service';
import { Article } from '../../models/Article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  title = 'articlesList';
  articles: any;

  constructor(private router: Router, private cart: ArticlesShoppingCartService){
  }

  ngOnInit(): void {
    this.cart.getArticles().subscribe(
      (response: any) => {
        this.articles = response; 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  deleteArticle(article: Article) {
    this.cart.deleteArticle(article).subscribe();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    alert("Se eliminó el artículo correctamente");
  }

  addToCart(article: Article) {
    if (article.stock > 0 && article.quantity > 0) {
        this.cart.addToCart(article);
        article.stock -= article.quantity;
        this.cart.editArticle(article).subscribe();
        article.quantity = 0;
    }
  }

  maxReached(m: string){
    alert(m);
  }
}
