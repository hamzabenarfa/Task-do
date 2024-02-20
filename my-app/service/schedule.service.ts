import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; 

class ScheduleService {
  
  private http: AxiosInstance;
  private token: string | null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem("accessToken");
    } else {
      this.token = null;
    }
    this.http = axios.create({
      baseURL: `${apiBaseUrl}/schedule`,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });
  }

  async fetchSchedule() {
    try {
      const response = await this.http.get("/get");
      const scheduledItems = response.data.flatMap(item => item._scheduledItems || []).map(item => ({
        id: item._id,
        task: item._task,
        duration: item._duration,
        startAt: this.formatTime(item.start_at),
        endAt: this.formatTime(item.end_at),
        isAppointment: item._isAppointment,
      }));
      console.log("🚀 ~ ScheduleService ~ fetchSchedule ~ scheduledItems:", scheduledItems)
      return { data: scheduledItems, error: null, isLoading: false };
    } catch (error) {
      console.error("Fetching schedule failed:", error);
      return { data: null, error: error, isLoading: false };
    }
  }

  formatTime(dateTimeString) {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('default', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // Use 24-hour clock
    }).format(date);
  }
}

const scheduleService = new ScheduleService();
export default scheduleService;
