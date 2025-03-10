import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: "root",
})
export class BackendServiceService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const exercises = [
      { id: 1, name: "Push-ups", reps: 20, date: "2025-03-09" },
      { id: 2, name: "Squats", reps: 15, date: "2025-03-09" },
      { id: 3, name: "Plank", reps: 1, date: "2025-03-08" },
    ];
    return { exercises };
  }
}
