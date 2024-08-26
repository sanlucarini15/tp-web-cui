import { Component } from '@angular/core';
import { MeilisearchService } from '../../services/meilisearch/meilisearch.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Project } from '../models/project';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [FormsModule, CommonModule, NgFor, NgIf, RouterModule],
})
export class SearchComponent {
  query: string = '';
  results: Project[] = [];
  showNoResults: boolean = false;

  constructor(private meilisearchService: MeilisearchService, private router: Router) {}

  onSearch() {
    if (this.query.trim()) {
      this.meilisearchService.search('funding_options', this.query).subscribe(
        (results: any) => {
          // Mapea los resultados para crear instancias de Project
          this.results = results.hits.map((result: any) => {
            return new Project(result.Nombre, result.Descripcion);
          });
          this.showNoResults = this.results.length === 0;
        },
        (error) => {
          console.error('Error al realizar la búsqueda:', error);
          this.showNoResults = true;
        }
      );
    } else {
      this.results = [];
      this.showNoResults = false;
    }

    console.log("tamaño: ", this.results.length);
    console.log("tamaño: ", this.results);
  }


  onSelectResult(name: string) {
    this.router.navigate(['/details', name]);
  }
}
