import axios from "axios";
import Cookies from 'js-cookie';
const API_URL = "http://dkdcue9jdc.us-west-2.awsapprunner.com/api/"

class AuthService {
    public async login(username: string, password: string): Promise<boolean> {
        console.log("starting login request");
        const body = {
            username: username,
            password: password
        }
        const url = API_URL + "token"
        const axiosOptions = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await axios.post<LoginResponse>(url, body, axiosOptions);
            // handle success

            console.log(response);
            if (response.data.authentication_success) {
                Cookies.set('refreshToken', response.data.refreshToken);
                Cookies.set('accessToken', response.data.accessToken);
                window.location.assign('/');
                console.log("success");
                return true;
            } else {
                // TODO: Show error message
                console.log("not success");
            }
            return false;
        } catch (error) {
            // handle error
            console.log(error);
            console.log("login error");
            return false;
        }
    }

    public async refreshToken(): Promise<boolean> {
        console.log("starting refresh token request");
        const url = API_URL + "token/refresh/"
        const body = {
            "refresh": Cookies.get('refreshToken')
        }
        try {
            const response = await axios.post<RefreshTokenResponse>(url, body);
            Cookies.set('accessToken', response.data.access)
            return true;
        } catch (error) {
            // Force log out user + re authenticate
            console.log("should re auth")
            return false;
        }
    }

    public async is_logged_in(): Promise<boolean> {
        console.log("starting is logged in request");
        const url = API_URL + "is_user_logged_in"
        const config = {
            headers:{
                'Authorization': `Bearer ${Cookies.get('accessToken')}`
            }
        };
        try {
            const response = await axios.get(url, config)
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response)  {
                // Access to config, request, and response
                if (error.response.status === 401) {
                    console.log("should refresh token");
                    return this.refreshToken()
                }
              } else {
                // Just a stock error
              }
            return false;
        }
    }
}   

export default new AuthService;

type LoginResponse = {
    authentication_success: boolean,
    session_id: string,
    refreshToken: string,
    accessToken: string
};

type RefreshTokenResponse = {
    access: string
};