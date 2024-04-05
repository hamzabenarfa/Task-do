import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class AuthenticationService {
    private http: AxiosInstance;
    private token: string | null;

    constructor() {
        this.token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
        this.http = axios.create({
            baseURL: `${apiBaseUrl}/task`,
            headers: {
                'Content-type': 'application/json',
            },
        });
        this.setAuthorizationHeader();
    }

    setAuthorizationHeader() {
        if (this.token) {
            this.http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        } else {
            delete this.http.defaults.headers.common['Authorization'];
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
            const data = response.data;
            if (response.data) {
                this.token = data.accessToken;
                localStorage.setItem("accessToken", this.token);
                localStorage.setItem('user', JSON.stringify(data.userInfo));
                this.setAuthorizationHeader(); 
                return data;
            }
        } catch (error) {
            return error
        }
    }



    async register(name: string, email: string, password: string) {
        try {
            const response = await this.http.post(`${apiBaseUrl}/auth/register`, { name, email, password }); // Use this.http instead of axios
          
            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    async logout() {
        this.token = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        this.setAuthorizationHeader();
    }

 

}

const authService = new AuthenticationService();
export default authService;
