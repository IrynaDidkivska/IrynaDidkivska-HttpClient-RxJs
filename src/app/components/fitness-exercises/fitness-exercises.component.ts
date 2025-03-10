import { Component, OnInit } from "@angular/core";
import { Exercise } from "../../classes/exercise";
import { NgFor, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FitnessService } from "../../services/fitness.service";

@Component({
  selector: "app-fitness-exercises",
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: "./fitness-exercises.component.html",
  styleUrl: "./fitness-exercises.component.css",
})
export class FitnessExercisesComponent implements OnInit {
  exercises: Exercise[] = [];
  newExercise: Exercise = new Exercise(
    0,
    "",
    1,
    new Date().toISOString().split("T")[0]
  );
  selectedExercise: Exercise | null = null;

  constructor(private exerciseService: FitnessService) {}

  ngOnInit() {
    this.getExercises();
  }

  getExercises() {
    this.exerciseService.getExercises().subscribe({
      next: (exercises) => (this.exercises = exercises),
      error: (error) => console.error("Error fetching exercises:", error),
    });
  }
  addExercise() {
    this.newExercise.id = +`${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    this.exerciseService.addExercise(this.newExercise).subscribe({
      next: (exercise) => {
        this.exercises.push(exercise);
        this.newExercise = new Exercise(
          0,
          "",
          1,
          new Date().toISOString().split("T")[0]
        );
      },
      error: (error) => console.error("Error adding exercise:", error),
    });
  }

  selectExercise(exercise: Exercise) {
    this.selectedExercise = { ...exercise };
  }

  updateExercise() {
    if (this.selectedExercise) {
      this.exerciseService.updateExercise(this.selectedExercise).subscribe({
        next: () => {
          const index = this.exercises.findIndex(
            (e) => e.id === this.selectedExercise!.id
          );
          this.exercises[index] = { ...this.selectedExercise! };
          this.selectedExercise = null;
        },
        error: (error) => console.error("Error updating exercise:", error),
      });
    }
  }

  deleteExercise(id: number) {
    this.exerciseService.deleteExercise(id).subscribe({
      next: () => {
        this.exercises = this.exercises.filter((e) => e.id !== id);
      },
      error: (error) => console.error("Error deleting exercise:", error),
    });
  }
}
