import { Component, OnInit } from '@angular/core';
import {Movie} from '../movie';
import {MovieService} from '../movie.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  
  ngOnInit(): void {
    this.movies = [];
    this.nominatedMovies = [];
    
  }

  movies: Movie[];
  nominatedMovies: Movie[];
  searchTitle: string;
  
  //Calls the service function to get movies and pushes result into the movies array
  getMovies(title:string): void {
    this.movieService.getMovies(title).subscribe(movies =>
      { if (movies.Response === "True") {
        movies.Search.forEach(
          movie => this.movies.push(
            {
            title:movie.Title,
            year:movie.Year
            }
          ));
      } else {
        console.log(movies);
        swal(movies.Error , "Please modify input.", "warning");
      }})
  }

  //Empties the movies array when the search button is clicked
  clearMovies() {
    this.movies = [];
  }

  //Adds a movie into the nominatedMovies array and checks for nomination limit
  nominate(movie:Movie) {
    if(this.nominatedMovies.length >= 5){
      swal("Only 5 nominations allowed.", "Make up your mind.", "warning");
      return;
    }
    this.nominatedMovies.push(movie);
    if(this.nominatedMovies.length == 5){
      swal("Congrats!", "You've completed the nomination.", "success");
    }
  }

  //Removes a movie from the nomination list
  remove(movie:Movie) {
    this.nominatedMovies = this.nominatedMovies.filter(entry => entry !== movie);
    
  }

  //Checks the nomination status of a movie
  nominated(movie:Movie):boolean {
  	return this.nominatedMovies.find(e => e.title===movie.title && e.year===movie.year)!=null;
  }

  //Function for the email button to send the nomination list
  sendMail() {
    let body:string = 'Hello, this is my list for nominations:%0D%0D';
    this.nominatedMovies.forEach(movie => {
      body += ('Title: '+ movie.title + ' (' + movie.year + ')' + '%0D');
    });
    window.location.href = "mailto:?subject=My nomination list&body="+ body;
  };
}
