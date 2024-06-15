import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorPersonalizadoComponent } from './components/error-personalizado/error-personalizado.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: '**', component: ErrorPersonalizadoComponent }
];

