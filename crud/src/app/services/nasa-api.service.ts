import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NasaApiService {
  private apiKey = 'fAaGelNlfOczOpSfKsueW0zFamKj5G4EzJ8fIvbU';
  private apiUrl = 'https://api.nasa.gov/planetary/apod';

  constructor(private http: HttpClient) {}

  getAstronomyPictureOfTheDay() {
    const url = `${this.apiUrl}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
