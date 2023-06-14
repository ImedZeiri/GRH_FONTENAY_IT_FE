import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Task } from './task';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/login/auth.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  authService : AuthService

  constructor(private http: HttpClient) {
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  };
  getTasks(): Observable<Response[]> {
    let url = apiUrl + '/tasks';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched tasks')),
        catchError(this.handleError('get tasks', []))
      );
  };

  getTask(id: any): Observable<any[]> {
    let url = 'http://127.0.0.1:8000/api/tasks/'  + id;
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched tasks')),
        catchError(this.handleError('get tasks', []))
      );
  };

  getTasksProject(): Observable<Response[]> {
    let url = apiUrl + '/tasks/';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched project tasks')),
        catchError(this.handleError('get project tasks', []))
      );
  };

  addTask(task: { member_id: any; end_at: any; complexity: any; project_id: any; task_skill_id: any; name: any; state: any; start_at: any }): Observable<Response[]> {
    let url = apiUrl + '/tasks';
    return this.http.post<Response[]>(url, task, httpOptions).pipe(
      tap(heroes => console.log('added task')),
      catchError(this.handleError('addTask', []))
    );
  };

  updateTask(id: number, task: Task): Observable<Task> {
    const url = `${apiUrl}/tasks/${id}`;
    return this.http.put<Task>(url, task, httpOptions).pipe(
      tap(() => console.log('Updated Task')),
      catchError(this.handleError<Task>('updateTask'))
    );
  }


  deleteTask(id: number): Observable<Response[]> {
    let url = apiUrl + '/tasks/' + id;
    return this.http.delete<Response[]>(url, httpOptions).pipe(
      tap(heroes => console.log('deleted task')),
      catchError(this.handleError('deleteTask', []))
    );
  };

}
