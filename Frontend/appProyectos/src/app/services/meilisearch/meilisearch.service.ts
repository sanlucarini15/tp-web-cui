import { Injectable } from '@angular/core';
import { MeiliSearch } from 'meilisearch';

@Injectable({
  providedIn: 'root',
})
export class MeilisearchService {
  private client: MeiliSearch;

  constructor() {
    this.client = new MeiliSearch({
      host: 'http://127.0.0.1:7700',
    });
  }

  async search(indexName: string, query: string) {
    const index = this.client.index(indexName);
    const searchResults = await index.search(query);
    return searchResults.hits;
  }
}
