import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(
    private portfolioService: PortfolioService
  ) { }
  img: Array<String> = [];

  ngOnInit(): void {
    this.portfolioService.loadAlbums().subscribe({
      next: (data: any) => {
        this.img = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
