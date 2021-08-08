// import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// import { tap } from 'rxjs/operators';
// import { IAlbum } from '../shared/interfaces';
import { AdminGalleryService } from './admin-gallery.service';

@Component({
  selector: 'app-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.css']
})
export class AdminGalleryComponent {
  // files: Array<File> = [];
  constructor(
    private adminGalleryService: AdminGalleryService,
    private router: Router
  ) {
  }
  files: Array<any> = [];

  async handleSelectImages({ files }: any) {
    this.files = [];
    const reader = new FileReader();

    const readFile = async (index: number) => {
      if( index >= files.length ) return;
      const file = files[index];
      reader.onload = async (e: any) => {  
        (e.target && e.target.result && this.files.push(e.target.result));
        await readFile(index+1)
      };
      await reader.readAsDataURL(file);
    }
    await readFile(0);
  }

  uploadAlbums(form: NgForm): void {
    if (form.invalid) { return; }
    this.adminGalleryService.uploadAlbums({ form, images: this.files }).subscribe({
      next: () => {
        this.files = [];
        this.router.navigate(['gallery']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
