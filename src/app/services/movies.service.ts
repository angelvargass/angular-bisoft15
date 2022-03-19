import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MovieModel} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly API_URL = `${environment.apiUrl}/api/movies`;

  constructor(private http: HttpClient) { }

  getAllMovies(): Observable<MovieModel[]> {
    const url = `${this.API_URL}/get-all`;
    return this.http.get<MovieModel[]>(url);
  }
}
