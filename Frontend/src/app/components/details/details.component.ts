import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeilisearchService } from '../../services/meilisearch/meilisearch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule]
})
export class DetailsComponent implements OnInit {
  
  recordId: any; // Usar string si el id es un string
  recordDetails: any;

  constructor(private route: ActivatedRoute, private meilisearchService: MeilisearchService) { }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.getRecordDetails();
  }

  async getRecordDetails() {
    const indexName = 'funding_options'; // Cambiar después por el índice de proyectos
    try {
      this.recordDetails = await this.meilisearchService.getRecordById(indexName, this.recordId).toPromise();
    } catch (error) {
      console.error('Error al obtener detalles del registro:', error);
    }
  }
}
