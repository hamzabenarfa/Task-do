export interface Task {
    id: string | null;
    time: string[];
    timeDisplay: string;
    title: string;
    appointment: boolean;
    duration: number;
    context: string;
    priority: number;
  }