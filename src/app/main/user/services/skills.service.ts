import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:8000/api';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Response[]> {
    let url = apiUrl + '/user_skills';
    return this.http.get<Response[]>(url)
      .pipe(
        tap(heroes => console.log('fetched skills')),
        catchError(this.handleError('getSkills', []))
      );
  };

  getSkillById(skillId: number): Observable<any> {
    const url = `${apiUrl}/user_skills/${skillId}`;
    return this.http.get<any>(url, httpOptions).pipe(
      tap(skill => console.log(`fetched skill with ID ${skillId}`)),
      catchError(this.handleError<any>(`getSkillById skillId=${skillId}`))
    );
  }

  addSkill(skill: any): Observable<any> {
    const url = `${apiUrl}/user_skills`;
    return this.http.post<any>(url, skill, httpOptions).pipe(
      tap(newSkill => console.log(`added skill with ID ${newSkill.id}`)),
      catchError(this.handleError<any>('addSkill'))
    );
  }

  updateSkill(skillId: string, skill: any): Observable<any> {
    const url = `${apiUrl}/user_skills/${skillId}`;
    return this.http.put<any>(url, skill, httpOptions).pipe(
      tap(updatedSkill => console.log(`updated skill with ID ${skillId}`)),
      catchError(this.handleError<any>('updateSkill'))
    );
  }

  deleteSkill(skillId: string): Observable<any> {
    const url = `${apiUrl}/user_skills/${skillId}`;
    return this.http.delete<any>(url, httpOptions).pipe(
      tap(() => console.log(`deleted skill with ID ${skillId}`)),
      catchError(this.handleError<any>('deleteSkill'))
    );
  }

  getSkillRate(skillId: number): Observable<number> {
    const url = `${apiUrl}/user_skills/${skillId}`;
    return this.http.get<number>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
