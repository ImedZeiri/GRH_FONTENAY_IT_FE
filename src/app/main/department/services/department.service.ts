import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Department } from './department';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/login/auth.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  authService : AuthService

  constructor(private http: HttpClient) {
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  };
  getDepartments(): Observable<Response[]> {
    let url = apiUrl + '/departments';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched departments')),
        catchError(this.handleError('get departments', []))
      );
  };

  getCompanyAssociates(): Observable<Response[]> {
    let url = apiUrl + '/company_associates/';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched company associates')),
        catchError(this.handleError('get company associates', []))
      );
  };



  addDepartment(company: FormGroup): Observable<Response[]> {
    let url = apiUrl + '/departments';
    return this.http.post<Response[]>(url, company, httpOptions).pipe(
      tap(heroes => console.log('added department')),
      catchError(this.handleError('department', []))
    );
  };

  updateDepartment(id: number, department: Department): Observable<Response[]> {
    let url = apiUrl + '/departments' + id;
    return this.http.post<Response[]>(url, department, httpOptions).pipe(
      tap(heroes => console.log('updated department')),
      catchError(this.handleError('updateDepartment', []))
    );
  };

  deleteDepartment(id: number): Observable<Response[]> {
    let url = apiUrl + '/departments/' + id;
    return this.http.delete<Response[]>(url, httpOptions).pipe(
      tap(heroes => console.log('deleted department')),
      catchError(this.handleError('deletedepartment', []))
    );
  };

}
