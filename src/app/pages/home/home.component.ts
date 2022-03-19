import {Component, OnInit, ViewChildren} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MovieModel} from "../../models/movie.model";
import {MoviesService} from "../../services/movies.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource: MatTableDataSource<MovieModel> = new MatTableDataSource<MovieModel>();
  columnsToDisplay = [
    'id',
    'name',
    'description',
    'calification'
  ]
  @ViewChildren(MatPaginator) paginator: any;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getAllMovies().subscribe(res => {
      this.dataSource = new MatTableDataSource<MovieModel>(res);
      this.dataSource.paginator = this.paginator._results[0];
    });
  }

}
