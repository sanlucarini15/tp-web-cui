import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [NgClass, FormsModule]
})
export class RegisterComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password).subscribe(
      (response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Registration failed!');
      }
    );
  }
}
