import { Component, OnInit } from "@angular/core";
import { AlbumService } from "../../services/album.service";
import { NgFor, NgIf } from "@angular/common";
import { Album } from "../../classes/album";

@Component({
  selector: "app-album-list",
  imports: [NgFor, NgIf],
  templateUrl: "./album-list.component.html",
  styleUrl: "./album-list.component.css",
})
export class AlbumListComponent implements OnInit {
  albums: Album[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe({
      next: (albums) => {
        this.albums = albums;
        console.log("Transformed albums:", albums);
      },
      error: (error) => {
        console.error("Error fetching albums:", error);
      },
    });
  }
}
