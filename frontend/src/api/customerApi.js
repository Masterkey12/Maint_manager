import axios from './config'

export default {
    all: function() {
        return axios.get('/customers')
    },

    store: function(customer) {
        return axios.post('/customers', customer)
    },

    show: function(customerID) {
        return axios.get(`/customers/${customerID}`)
    },

    update: function(customer) {
        return axios.put(`/customers/${customer.id}`, customer)
    },

    delete: function(customerID) {
        return axios.delete(`/customers/${customerID}`)
    }
}