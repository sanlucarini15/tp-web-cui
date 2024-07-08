import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ErrorPersonalizadoComponent } from './components/error-personalizado/error-personalizado.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestAuthComponent } from './components/test-auth';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'test', component: TestAuthComponent },
    { path: '**', component: ErrorPersonalizadoComponent }
];

