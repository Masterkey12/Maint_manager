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
axios.defaults.baseURL = process.env.VUE_APP_DEFAULT_URL
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default axios