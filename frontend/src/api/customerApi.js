import axios, { getAuthHeaders } from './config'

export default {
    all: function() {
        return axios.get('/customers', {
            headers: getAuthHeaders()
        })
    },

    store: function(customer) {
        return axios.post('/customers', customer, {
            headers: getAuthHeaders()
        })
    },

    show: function(customerID) {
        return axios.get(`/customers/${customerID}`, {
            headers: getAuthHeaders()
        })
    },

    update: function(customer) {
        return axios.put(`/customers/${customer.id}`, customer, {
            headers: getAuthHeaders()
        })
    },

    delete: function(customerID) {
        return axios.delete(`/customers/${customerID}`, {
            headers: getAuthHeaders()
        })
    }
}