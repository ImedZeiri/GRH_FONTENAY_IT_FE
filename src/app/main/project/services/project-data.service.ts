import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {
  private projectId: number;

  constructor() { }

  setProjectId(id: number) {
    this.projectId = id;
  }

  getProjectId(): number {
    return this.projectId;
  }
}
