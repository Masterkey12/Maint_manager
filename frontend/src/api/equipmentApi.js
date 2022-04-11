import axios, { getAuthHeaders } from './config'

export default {
    all: function() {
        return axios.get('/equipements', {
            headers: getAuthHeaders()
        });
    },

    store: function(equipment) {
        return axios.post('/equipements', equipment, {
            headers: getAuthHeaders()

        });
    },

    show: function(equipmentID) {
        return axios.get(`/equipements/${equipmentID}`, {
            headers: getAuthHeaders()
        });
    },

    update: function(equipmentID) {
        return axios.put(`/equipements/${equipmentID.id}`, equipmentID, {
            headers: getAuthHeaders()
        });
    },

    delete: function(equipmentID) {
        return axios.delete(`/equipements/${equipmentID}`, {
            headers: getAuthHeaders()
        });
    }
}