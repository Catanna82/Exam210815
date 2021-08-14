import { Component, OnInit } from '@angular/core';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {

  constructor(
    private galleryService: GalleryService
  ) { }

  files: Array<String> = [];
  images: Array<String> = [];
  ngOnInit(): void {
    this.galleryService.loadAlbums().subscribe({
      next: (data: any) => {
        this.files = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  showImages(data: String){
    this.galleryService.loadAlbum(data).subscribe({
      next: (data: any) => {
        this.images = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
    
  }
}
