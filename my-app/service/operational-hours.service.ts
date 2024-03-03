import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class OperationalHours {
    private http: AxiosInstance;
    private token: string | null;

    constructor() {
        this.token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
        this.http = axios.create({
            baseURL: `${apiBaseUrl}/operationalhours`,
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
        });
    }

    async fetchOperationalHours() {
        try {
            const response = await this.http.get('/get');
            return { data: response.data };
        } catch (error) {
            return { error: error};
        }
    }



}



const operationalHours = new OperationalHours();
export default operationalHours;