import axios from "axios";
import Cookies from 'js-cookie';
const API_URL = "http://localhost:8000/api/"

class AuthService {
    public async login(username: string, password: string): Promise<boolean> {
        const body = {
            username: username,
            password: password
        }
        const url = API_URL + "token"
        try {
            const response = await axios.post(url, body);
            // handle success
            const loginResponse = (response.data as LoginResponse);
            console.log(response);
            console.log(loginResponse);
            if (loginResponse.authentication_success) {
                Cookies.set('refreshToken', loginResponse.refreshToken);
                Cookies.set('accessToken', loginResponse.accessToken);
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
            return false;
        }
    }
}

export default AuthService;

type LoginResponse = {
    authentication_success: boolean,
    session_id: string,
    refreshToken: string,
    accessToken: string
};