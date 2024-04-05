import axios, { AxiosInstance } from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class UserService {
    private http: AxiosInstance;
    private token: string | null;

    constructor() {
        this.token = typeof window !== 'undefined' ? localStorage.getItem("accessToken") : null;
        this.http = axios.create({
            baseURL: `${apiBaseUrl}`,
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



    async getImageProfile() {
        try {
            const profileImage = await this.http.get(`/user/get-profile-img`);
            const response = await this.http.get(`/public/images/${profileImage.data}`, { responseType: 'blob' });
            const data = response.data;
            if (response.status === 200) {
                return data;
            }
        } catch (error) {
            return error;
        }
    }

    async uploadImageProfile(file: File) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await this.http.post('/user/upload-img-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
           
        } catch (error) {
            return error;
        }
    }







}

const userService = new UserService();
export default userService;
