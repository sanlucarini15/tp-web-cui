import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Article } from './models/Article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticlesShoppingCartService {
  private apiUrl = 'http://localhost:3000'; 
  
  httpOptions= {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/articulos`);
  }

  deleteArticle(article: Article): Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}/articulos/delete/`+article.articulo);
  }

  editArticle(article: Article): Observable<Article> {
    return this.http.put<any>(`${this.apiUrl}/articulos/updateAmount/`+article.articulo, article, this.httpOptions);
  }
  
  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}/articulos/insert/`, article, this.httpOptions);
  }

  private _shopList: Article[] = [];

  shopList: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  addToCart(article: Article): void {
    let item: Article = this._shopList.find((v1) => v1.articulo == article.articulo)!;
    if (!item){
      this._shopList.push({ ... article});
    } else {
        item.quantity += article.quantity;
    }
    console.log(this._shopList);
    this.shopList.next(this._shopList);
  }

}
