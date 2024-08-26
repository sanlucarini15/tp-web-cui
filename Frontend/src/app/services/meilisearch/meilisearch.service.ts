import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeilisearchService {
  
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  search(indexName: string, query: string) {
    return this.http.post(`${this.apiUrl}/search`, { indexName, query });
  }

  addDocuments(indexName: string, documents: any[]) {
    return this.http.post(`${this.apiUrl}/add-documents`, { indexName, documents });
  }

  importCSV(filePath: string, indexName: string) {
    return this.http.post(`${this.apiUrl}/import-csv`, { filePath, indexName });
  }

  getRecordById(indexName: string, id: string) {
    return this.http.get(`${this.apiUrl}/get-record`, { params: { indexName, id } });
  }

}
