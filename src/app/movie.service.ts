import { Injectable } from '@angular/core';
//import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  //Fetches movies from the api with the user input
  getMovies(title:string): Observable<any>{
    return this.http.get(this.baseUrl + title)
      .pipe(
        catchError(this.handleError('getHeroes', []))
      );
  }
  
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // Sends the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Logs error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Lets the app keep running by returning an empty result.
    return of(result as T);
  };
}
  // URL to the OMDb api
  private baseUrl = 'https://www.omdbapi.com/?apikey=88240a0d&type=movie&s=';  
}
