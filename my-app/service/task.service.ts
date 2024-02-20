import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class TaskService {
  private http: AxiosInstance;
  private token: string | null;

  constructor() {
    this.token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
    this.http = axios.create({
      baseURL: `${apiBaseUrl}/task`, 
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  async createTask(task: string, duration: number, context: string, priority: number, start_at: string, isAppointment: boolean) {
    {
    try {
      const response = await this.http.post("/create", {
        task,
        duration,
        context,
        priority,
        start_at,
        isAppointment
      });

      console.log("Task created successfully:", response.data);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Creating task failed:", error);
      return { data: null, error: error };
    }
  }
  }
}


const taskService = new TaskService();
export default taskService;