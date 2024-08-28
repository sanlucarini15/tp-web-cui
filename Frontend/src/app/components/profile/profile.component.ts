import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ProfileComponent implements OnInit {

  username: string | null = null;
  userRole: string | null = null;
  preferences: string[] = [];
  newPreference: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe(
      (response) => {
        if (response.message === 'Usuario autenticado') {
          this.username = response.username;
          this.loadPreferences();
          this.loadUserRole();
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al verificar la autenticación:', error);
      }
    );
  }

  loadPreferences() {
    this.authService.getPreferences().subscribe(
      (response) => {
        this.preferences = response.preferences;
      },
      (error) => {
        console.error('Error al cargar las preferencias:', error);
      }
    );
  }

  loadUserRole() {
    this.authService.getUserRole().subscribe(
      (role) => {
        this.userRole = role;
      },
      (error) => {
        console.error('Error al cargar el rol del usuario:', error);
      }
    );
  }

  addPreference() {
    if (this.newPreference.trim() !== '') {
      this.authService.addPreference(this.newPreference).subscribe(
        (response) => {
          this.preferences = response.preferences;
          this.newPreference = '';
        },
        (error) => {
          console.error('Error al agregar la preferencia:', error);
        }
      );
    }
  }

  onLogout() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }

  onLogin() {
    this.router.navigate(['/login']);
  }

  navigateToAddProject() {
    this.router.navigate(['/add-proyect']);
  }

}
