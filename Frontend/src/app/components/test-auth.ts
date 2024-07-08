import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-test-auth',
  standalone: true,
  template: `
    <div *ngIf="isAuthenticated; else notAuthenticated">
      <p>Authenticated as: {{ username }}</p>
    </div>
    <ng-template #notAuthenticated>
      <p>Not authenticated</p>
    </ng-template>
  `,
  imports: [NgIf]
})
export class TestAuthComponent implements OnInit {
  isAuthenticated = false;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(
      (response) => {
        this.isAuthenticated = true;
        this.username = response.username;
      },
      (error) => {
        this.isAuthenticated = false;
        this.username = null;
      }
    );
  }
}
