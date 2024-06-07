import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MeilisearchService } from './meilisearch.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule, NgFor, NgIf],
  providers: [MeilisearchService] 
})

export class AppComponent {
  title = 'meilisearch-app';
  query: string = '';
  results: any[] = [];

  constructor(private meilisearchService: MeilisearchService) {}

  async onSearch() {
    if (this.query.trim()) {
      this.results = await this.meilisearchService.search('steam-video-games', this.query);
    } else {
      this.results = [];
    }
  }
}
