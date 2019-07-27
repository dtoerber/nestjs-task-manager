export enum TaskStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
