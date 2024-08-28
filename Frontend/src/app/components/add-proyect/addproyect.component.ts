import { Component } from '@angular/core';
import { MeilisearchService } from '../../services/meilisearch/meilisearch.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addproyect',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addproyect.component.html',
  styleUrls: ['./addproyect.component.css'],
})
export class AddProyectComponent {
  selectedFile: File | null = null;
  indexName: string = '';
  message: string = '';

  constructor(private meilisearchService: MeilisearchService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.selectedFile && this.indexName) {
      this.meilisearchService.addDocuments(this.indexName, this.selectedFile)
        .subscribe(
          response => {
            console.log('Documentos agregados:', response);
            this.message = 'Documentos agregados exitosamente.';
          },
          error => {
            console.error('Error al agregar documentos:', error);
            this.message = 'Hubo un error al agregar los documentos.';
          }
        );
    } else {
      this.message = 'Por favor, selecciona un archivo y proporciona un nombre de índice.';
    }
  }
}
