import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Album } from "../classes/album";

@Injectable({
  providedIn: "root",
})
export class AlbumService {
  private apiUrl = "https://jsonplaceholder.typicode.com/albums";

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((albums: any[]) => {
        console.log("Original albums from server:", albums);

        return albums.map((album) => new Album(album.id, album.title));
      })
    );
  }
}
