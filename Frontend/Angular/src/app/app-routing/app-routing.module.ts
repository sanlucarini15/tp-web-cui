import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreArticlesComponent } from '../components/store-articles/store-articles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full'
  },
  {
    path: 'articles',
    component: StoreArticlesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
