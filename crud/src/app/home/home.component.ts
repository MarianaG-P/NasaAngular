import { Component, OnInit } from '@angular/core';
import { NasaApiService } from '../services/nasa-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  astronomyPicture: any;

  constructor(private nasaApiService: NasaApiService){}
  ngOnInit(): void {
    this.nasaApiService.getAstronomyPictureOfTheDay().subscribe((data: any) => {
      this.astronomyPicture = data;
    });
  }

}
