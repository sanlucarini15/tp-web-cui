import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeilisearchService } from '../../services/meilisearch/meilisearch.service';
import { CommonModule } from '@angular/common';
import { Project } from '../models/project'; // Importar tu modelo Project

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule]
})
export class DetailsComponent implements OnInit {

  recordId: string | null = null;
  recordDetails: Project | null = null;

  constructor(private route: ActivatedRoute, private meilisearchService: MeilisearchService) { }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get('id');
    if (this.recordId) {
      this.getRecordDetails();
    }
  }

  getRecordDetails() {
    const indexName = 'f';
    this.meilisearchService.search(indexName, this.recordId!).subscribe(
      (results: any) => {
        if (results.hits.length > 0) {
          const result = results.hits[0];
          this.recordDetails = new Project(result.Nombre, result.Descripcion, result.Tipo, result.Link);
        } else {
          console.error('No se encontraron detalles para el ID:', this.recordId);
        }
      },
      (error) => {
        console.error('Error al obtener detalles del registro:', error);
      }
    );
  }
}
