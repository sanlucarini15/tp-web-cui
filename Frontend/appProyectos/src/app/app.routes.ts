import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorPersonalizadoComponent } from './components/error-personalizado/error-personalizado.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: '**', component: ErrorPersonalizadoComponent }
];

