import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    register(user) {
        return axios.post(API_URL + 'auth/register', user);
    }

    getProfile() {
        const token = localStorage.getItem('token');
        return axios.get(API_URL + 'profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      updateProfile(profile) {
        const token = localStorage.getItem('token');
        return axios.put(API_URL + 'profile', profile, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

    // Other methods (login, logout, etc.)
}

export default new AuthService();
