import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeilisearchService {
  
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // Método para realizar una búsqueda en Meilisearch
  search(indexName: string, query: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, { indexName, query });
  }

  // Método para agregar documentos a Meilisearch desde un archivo CSV
  addDocuments(indexName: string, csvFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('csvFile', csvFile);
    formData.append('indexName', indexName);

    return this.http.post(`${this.apiUrl}/add-documents`, formData, {
      withCredentials: true, // Si usas cookies para la sesión, esto es importante
    });
  }

  // Método para importar un CSV desde una ruta en el servidor (usado internamente en el servidor)
  importCSV(filePath: string, indexName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/import-csv`, { filePath, indexName });
  }

  // Método para obtener un documento específico por su ID
  getRecordById(indexName: string, id: string): Observable<any> {
    const params = new HttpParams()
      .set('indexName', indexName)
      .set('id', id);

    return this.http.get(`${this.apiUrl}/get-record`, { params });
  }
}
