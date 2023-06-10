export interface Task {
  id: number;
  name: string;
  state: string;
  startAt: Date;
  endAt: Date;
  complexity: number;
  projectId: string;
  memberId: string[];
  taskSkillId: string[];
  project_id: string;
  task_skill_id: string[];
  member_id: string[];
  start_at: string;
  end_at: string;
}
