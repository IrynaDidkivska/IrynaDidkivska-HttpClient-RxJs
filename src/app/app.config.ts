import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { BackendServiceService } from "./services/backend.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Обов'язкове підключення для роботи HttpClient👇
    provideHttpClient(),
    // Фейковий бекенд для другого прикладу для get(), post(), put(), delete() запитів
    // importProvidersFrom(
    //   HttpClientInMemoryWebApiModule.forRoot(BackendServiceService)
    // ),
  ],
};
