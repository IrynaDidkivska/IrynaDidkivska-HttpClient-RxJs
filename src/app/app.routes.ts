import { Routes } from "@angular/router";
import { AlbumListComponent } from "./components/album-list/album-list.component";
import { FitnessExercisesComponent } from "./components/fitness-exercises/fitness-exercises.component";

export const routes: Routes = [
  { path: "album", component: AlbumListComponent },
  { path: "fitness", component: FitnessExercisesComponent },
];
