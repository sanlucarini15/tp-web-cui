import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MeilisearchService } from './app/meilisearch.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([]),
    MeilisearchService
  ]
}).catch(err => console.error(err));
