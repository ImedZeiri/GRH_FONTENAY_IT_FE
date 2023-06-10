// project.model.ts
export interface Project {
  id: number;
  owner: string;
  tasks: string[];
  projectMembers: string[];
  missions: any[];
  client: string;
  name: string;
  startAt: string; // Modifier le nom de la propriété
  endAt: string; // Modifier le nom de la propriété
  field: string;
}
