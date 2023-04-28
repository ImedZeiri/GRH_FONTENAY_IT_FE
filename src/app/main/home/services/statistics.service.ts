import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private usersCount = 10;
  private companyTasksCount = 5;
  private projectsCount = 3;

  constructor() { }

  getUsersCount(): number {
    return this.usersCount;
  }

  getCompanyTasksCount(): number {
    return this.companyTasksCount;
  }

  getProjectsCount(): number {
    return this.projectsCount;
  }
}
