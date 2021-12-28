import axios from './config'

export default {
    all: function() {
        return axios.get('/equipements')
    },

    store: function(equipment) {
        return axios.post('/equipements', equipment)
    },

    show: function(equipmentID) {
        return axios.get(`/equipements/${equipmentID}`)
    },

    update: function(equipmentID) {
        return axios.put(`/equipements/${equipmentID.id}`, equipmentID)
    },

    delete: function(equipmentID) {
        return axios.delete(`/equipements/${equipmentID}`)
    }
}