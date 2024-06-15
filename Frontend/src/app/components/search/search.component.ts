import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MeilisearchService } from '../../services/meilisearch/meilisearch.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, NgIf, RouterOutlet, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  query: string = '';
  results: any[] = [];
  showNoResults: boolean = false; // Variable para controlar la visibilidad del mensaje

  constructor(private meilisearchService: MeilisearchService) {}

  async onSearch() {
    if (this.query.trim()) {
      this.results = await this.meilisearchService.search('steam-video-games', this.query);
      this.showNoResults = this.results.length === 0; // Mostrar mensaje si no hay resultados
    } else {
      this.results = [];
      this.showNoResults = false; // Ocultar mensaje si la búsqueda está vacía
    }
  }

}
