import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MoviesService} from "../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  movieForm = this.fb.group({
    name: [null, Validators.required,],
    description: [null, Validators.required],
    calification: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
  });

  editMode = false;

  constructor(private fb: FormBuilder, private moviesService: MoviesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkRouteParams();
  }

  private checkRouteParams() {
    if(this.activatedRoute.snapshot.paramMap.get('id')) {
      const movieId = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.editMode = true;
      this.setData(movieId);
    }
  }

  private setData(movieId: string) {
    if(this.editMode) {
      this.moviesService.getMovieById(movieId).subscribe(res => {

      });
    }
  }

  formSubmit() {
    if(this.movieForm.valid) {
      this.moviesService.saveMovie(this.movieForm.value).subscribe(res => {
        this.router.navigate(['/home']);
      });
    }
  }

  get name() {
    return this.movieForm.get('name');
  }

  get description() {
    return this.movieForm.get('description');
  }

  get calification() {
    return this.movieForm.get('calification');
  }

}
