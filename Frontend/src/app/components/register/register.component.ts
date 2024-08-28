import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';  
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';
  
  passwordVisible: boolean = false; 
  confirmPasswordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  onRegister() {
    const userData = {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      email: this.email,  // <-- Incluir el email en los datos
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  
    this.http.post('http://localhost:5000/api/register', userData).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = error.error.message || 'Error al registrarse';
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
