import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { StoreArticlesComponent } from './components/store-articles/store-articles.component';
import { AppRoutingModule } from './app-routing.module';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { HttpClientModule } from '@angular/common/http';
import { InputArticleComponent } from './components/input-article/input-article.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ShoppingCartComponent,
    StoreArticlesComponent,
    InputNumberComponent,
    InputArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
