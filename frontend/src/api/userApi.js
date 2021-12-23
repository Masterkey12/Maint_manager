import axios from './config'

export default {
    all: function() {
        return axios.get('/users')
    },

    store: function(user){
        return axios.post('/users', user)
    },

    show: function(userID) {
        return axios.get(`/users/${userID}`)
    },

    update: function(user) {
        return axios.put(`/users/${user.id}`, user)
    },

    delete: function(userID) {
        return axios.delete(`/users/${userID}`)
    }
}