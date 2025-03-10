import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Exercise } from "../classes/exercise";

@Injectable({
  providedIn: "root",
})
export class FitnessService {
  private apiUrl = "api/exercises";

  private httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  // GET
  getExercises(): Observable<Exercise[]> {
    return this.http
      .get<Exercise[]>(this.apiUrl)
      .pipe(
        map((exercises: any[]) =>
          exercises.map((ex) => new Exercise(ex.id, ex.name, ex.reps, ex.date))
        )
      );
  }

  // GET
  getExercise(id: number): Observable<Exercise> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .get<Exercise>(url)
      .pipe(map((ex) => new Exercise(ex.id, ex.name, ex.reps, ex.date)));
  }

  // POST
  addExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.apiUrl, exercise, this.httpOptions);
  }

  // PUT
  updateExercise(exercise: Exercise): Observable<void> {
    const url = `${this.apiUrl}/${exercise.id}`;
    return this.http.put<void>(url, exercise, this.httpOptions);
  }

  // DELETE
  deleteExercise(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
