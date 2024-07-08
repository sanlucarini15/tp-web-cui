import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Verificar si hay un usuario logeado antes de permitir el acceso a LoginComponent
    this.authService.checkAuth().subscribe(
      (response) => {
        if (response.message === 'Usuario autenticado') {
          this.router.navigate(['/profile']);
        }
      },
      (error) => {
        console.error('Error al verificar autenticación:', error);
      }
    );
  }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.router.navigate(['/profile']);
      },
      error => {
        this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
      }
    );
  }
}
