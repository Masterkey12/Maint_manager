import axios from 'axios'

function getToken() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user && user.token) {
        return user.token
    } else {
        return null
    }
}

const token = getToken()
// console.log("url : ", process.env.VUE_APP_DEFAULT_URL);
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios