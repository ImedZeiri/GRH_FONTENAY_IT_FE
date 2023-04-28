import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Company } from './company';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../../core/services/login/auth.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://127.0.0.1:8000/api';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  authService : AuthService

  constructor(private http: HttpClient) {
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  };
  getCompanys(): Observable<Response[]> {
    let url = apiUrl + '/companies';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched companies')),
        catchError(this.handleError('get companies', []))
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

  getCompany(id: any): Observable<Response[]> {
    let url = 'http://localhost:8000'  + id;
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched companies')),
        catchError(this.handleError('get companies', []))
      );
  };

  addCompany(company: FormGroup): Observable<Response[]> {
    let url = apiUrl + '/companies';
    return this.http.post<Response[]>(url, company, httpOptions).pipe(
      tap(heroes => console.log('added comapny')),
      catchError(this.handleError('addCompany', []))
    );
  };

  updateCompany(id: number, copmany: Company): Observable<Response[]> {
    let url = apiUrl + '/companies' + id;
    return this.http.post<Response[]>(url, copmany, httpOptions).pipe(
      tap(heroes => console.log('updated companies')),
      catchError(this.handleError('updateCompany', []))
    );
  };

  deleteCompany(id: number): Observable<Response[]> {
    let url = apiUrl + '/companies/' + id;
    return this.http.delete<Response[]>(url, httpOptions).pipe(
      tap(heroes => console.log('deleted copmany')),
      catchError(this.handleError('deleteCompany', []))
    );
  };

}
