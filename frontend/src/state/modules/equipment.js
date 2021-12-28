import equipmentApi from '../../api/equipmentApi'

const state = {
    equipments: [],
    equipment: {}
}

const getters = {}

const actions = {
    async getEquipments({ commit }) {
        const res = await equipmentApi.all()
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 200) {
            commit('SET_EQUIPMENTS', res.data)
            return true
        }
    },

    async createEquipment({ commit }, equipment) {
        const res = await equipmentApi.store(equipment)
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 201) {
            commit('CREATE_EQUIPMENT', equipment)
            return true
        }
    },

    async getEquipmentById({ commit }, equipmentID) {
        const res = await equipmentApi.show(equipmentID)
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 200) {
            // console.log(res.data);
            commit('SET_EQUIPMENT', res.data)
            return true
        }
    },

    async updateEquipment({ commit }, equipment) {
        const res = await equipmentApi.update(equipment)
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 201) {
            commit('UPDATE_EQUIPMENT', res.data)
            return true
        }
    },

    async deleteEquipment({ commit }, equipmentID) {
        const res = await equipmentApi.delete(equipmentID)
            .catch(err => {
                console.log(err);
                return false;
            });

        if (res.status === 200) {
            commit('DELETE_EQUIPMENT', equipmentID);
            return true;
        }
    }
}

const mutations = {
    SET_EQUIPMENTS: (state, equipments) => state.equipments = equipments,

    SET_EQUIPMENT: (state, equipment) => state.equipment = equipment,
    EMPTY_EQUIPMENT: (state) => state.equipment = {},

    CREATE_EQUIPMENT: (state, equipment) => state.equipments.unshift(equipment),

    UPDATE_EQUIPMENT: (state, equipment) => {
        const index = state.equipments.findIndex(equipment => equipment.id === equipment.id);

        if (index !== -1) {
            state.equipments.splice(index, 1, equipment);
        }
    },

    DELETE_EQUIPMENT: (state, equipmentID) => {
        state.equipments = state.equipments.filter(equipment => equipment.id === equipmentID);
    },
}

export default { state, actions, getters, mutations }