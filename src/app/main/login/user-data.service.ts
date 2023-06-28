import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private responsedata = new BehaviorSubject<any>(null);
  responsedata$ = this.responsedata.asObservable();

  constructor() { }

  setResponsedata(data: any) {
    this.responsedata.next(data);
  }
}
