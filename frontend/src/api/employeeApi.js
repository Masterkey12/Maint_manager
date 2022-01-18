import axios, { getAuthHeaders } from './config';

export default {
    all: function () {
        return axios.get('/employees', {
            headers: getAuthHeaders()
        })
    },
    store: function (data) {
        return axios.post('/employees', data, {
            headers: getAuthHeaders()
        })
    },
    update: function (data) {
        return axios.put(`employees/${data.id}`, data, {
            headers: getAuthHeaders()
        });
    },
    get: function(employeeId) {
        return axios.get(`employees/${employeeId}`, {
            headers: getAuthHeaders()
        });
    },
    delete: function(employeeId) {
        return axios.delete(`employees/${employeeId}`, {
            headers: getAuthHeaders()
        });
    }
}