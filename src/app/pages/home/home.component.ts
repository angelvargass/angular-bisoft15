import {Component, OnInit, ViewChildren} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieModel} from "../../models/movie.model";
import {MoviesService} from "../../services/movies.service";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  movies: MovieModel[] = [];

  dataSource: MatTableDataSource<MovieModel> = new MatTableDataSource<MovieModel>();
  columnsToDisplay = [
    'id',
    'name',
    'description',
    'calification',
    'delete',
  ]
  @ViewChildren(MatPaginator) paginator: any;

  constructor(private moviesService: MoviesService, private route: Router) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getAllMovies().subscribe(res => {
      this.movies = res;
      this.dataSource = new MatTableDataSource<MovieModel>(this.movies);
      this.dataSource.paginator = this.paginator._results[0];
    });
  }

  editMovie(id: string) {
    this.route.navigate(['edit', id]);
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
    });
  }

}
