import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe();
  }

  onUserIconClick() {
    this.authService.checkAuth().subscribe(
      (response) => {
        if (response.message === 'Usuario autenticado') {
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.router.navigate(['/login']);
      }
    );
  }

}
