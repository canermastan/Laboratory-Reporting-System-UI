import axios from "axios";

// package.json has been modified to proxy all requests to the backend
const API_URL = "/auth";

export default class AuthService {
    login(email, password) {
        let data = {
            email: email,
            password: password
        }
        return axios
            .post(API_URL + "/login", data, { headers: { 'Content-Type': 'application/json' } }) 
            .then((response) => {
                if (response.data.token !== null) {
                    localStorage.setItem("token", JSON.stringify(response.data.token));
                    localStorage.setItem("role", JSON.stringify(response.data.role));
                }

                return response.data;
            })
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    }

    isUserLoggedIn() {
        return localStorage.getItem("token") !== null;
    }
}