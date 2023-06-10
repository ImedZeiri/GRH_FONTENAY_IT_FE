import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Project } from './project';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/login/auth.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  authService : AuthService

  constructor(private http: HttpClient) {
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  };
  getProjects(): Observable<Response[]> {
    let url = apiUrl + '/projects';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('get projects', []))
      );
  };

  getProject(id: any): Observable<Response[]> {
    let url = apiUrl + '/projects/'  + id;
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched projects')),
        catchError(this.handleError('get projects', []))
      );
  };

  addProject(project: FormGroup): Observable<Response[]> {
    let url = apiUrl + '/projects';
    return this.http.post<Response[]>(url, project, httpOptions).pipe(
      tap(heroes => console.log('added project')),
      catchError(this.handleError('addProject', []))
    );
  };

  updateProject(id: number, project: Project): Observable<Response[]> {
    let url = apiUrl + '/projects/' + id;
    return this.http.put<Response[]>(url, project, httpOptions).pipe(
      tap(heroes => console.log('updated project')),
      catchError(this.handleError('updateProject', []))
    );
  };

  deleteProject(id: number): Observable<Response[]> {
    let url = apiUrl + '/projects/' + id;
    return this.http.delete<Response[]>(url, httpOptions).pipe(
      tap(heroes => console.log('deleted project')),
      catchError(this.handleError('deleteProject', []))
    );
  };

}
