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
    id: [null],
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
        console.log(res);
        this.movieForm.controls['id'].setValue(res.id);
        this.movieForm.controls['name'].setValue(res.name);
        this.movieForm.controls['description'].setValue(res.description);
        this.movieForm.controls['calification'].setValue(res.calification);
      });
    }
  }

  formSubmit() {
    if(this.movieForm.valid) {
      if(this.editMode) {
        this.updateMovie(this.movieForm.value);
      } else {
        this.saveMovie(this.movieForm.value);
      }
    }
  }

  saveMovie(form: any) {
    this.moviesService.saveMovie(form).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

  updateMovie(form: any) {
    this.moviesService.updateMovie(form).subscribe(res => {
      this.router.navigate(['/home']);
    });
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
