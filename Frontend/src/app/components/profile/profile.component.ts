import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  
  username: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe(
      (response) => {
        if (response.message === 'Usuario autenticado') {
          this.username = response.username;
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al verificar la autenticación:', error);
      }
    );
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


}
