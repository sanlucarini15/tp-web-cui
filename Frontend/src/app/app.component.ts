import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.checkAuth().subscribe();
  }

  onUserIconClick() {
    if (this.authService.isLoggedIn()) {
      this.authService.redirectToProfile();
    } else {
      this.authService.redirectToLogin();
    }
  }
}
