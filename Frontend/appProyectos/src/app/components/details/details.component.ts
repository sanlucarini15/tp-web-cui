import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeilisearchService } from '../../services/meilisearch/meilisearch.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  imports: [CommonModule]
})
export class DetailsComponent implements OnInit {
  
  recordId: any; //Con string no funciona
  recordDetails: any;

  constructor(private route: ActivatedRoute, private meilisearchService: MeilisearchService) { }

  ngOnInit(): void {
    this.recordId = this.route.snapshot.paramMap.get('id');
    this.getRecordDetails();
  }

  async getRecordDetails() {
    const indexName = 'steam-video-games'; //Cambiar despues por el indice de proyectos
    this.recordDetails = await this.meilisearchService.getRecordById(indexName, this.recordId);
  }
}
