import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Users } from './users';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  };

  getUsers(): Observable<Response[]> {
    let url = apiUrl + '/users';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  };

  getUser(id: any): Observable<Response[]> {
    let url = apiUrl + '/user/' + id;
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  };

  addUsers(user: Users): Observable<Response[]> {
    let url = apiUrl + '/user/add';
    return this.http.post<Response[]>(url, user, httpOptions).pipe(
      tap(heroes => console.log('added user')),
      catchError(this.handleError('addUser', []))
    );
  };

  updateUser(id: number, user: Users): Observable<Response[]> {
    let url = apiUrl + '/user/edit/' + id;
    return this.http.post<Response[]>(url, user, httpOptions).pipe(
      tap(heroes => console.log('updated user')),
      catchError(this.handleError('updateUser', []))
    );
  };
}
