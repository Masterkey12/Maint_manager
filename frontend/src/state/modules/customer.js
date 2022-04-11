import customerApi from '../../api/customerApi'

const state = {
    customers: [],
    customer: {}
}

const getters = {}

const actions = {
    getCustomers({ commit }) {
        return new Promise((resolve, eject) => {
            customerApi
                .all()
                .then((response) => {
                    if (response.status === 200) {
                        commit("SET_CUSTOMERS", response.data);
                        resolve(response);
                    }
                    eject(response);
                })
                .catch((err) => {
                    eject(err);
                });
        })
    },


    async createCustomer({ commit }, customer) {
        const res = await customerApi.store(customer)
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 201) {
            commit('CREATE_CUSTOMER', customer)
            return true
        }
    },

    async getCustomerById({ commit }, customerID) {
        const res = await customerApi.show(customerID)
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 200) {
            // console.log(res.data);
            commit('SET_CUSTOMER', res.data)
            return true
        }
    },

    async updateCustomer({ commit }, customer) {
        const res = await customerApi.update(customer)
            .catch(err => {
                console.log(err)
                return false
            })

        if (res.status === 200) {
            commit('UPDATE_CUSTOMER', res.data.customer)
            return true
        }
    },

    async deleteCustomer({ commit }, customerID) {
        const res = await customerApi.delete(customerID)
            .catch(err => {
                console.log(err);
                return false;
            });

        if (res.status === 200) {
            commit('DELETE_CUSTOMER', customerID);
            return true;
        }
    }
}

const mutations = {
    SET_CUSTOMERS: (state, customers) => state.customers = customers,

    SET_CUSTOMER: (state, customer) => state.customer = customer,
    EMPTY_CUSTOMER: (state) => state.computer = {},

    CREATE_CUSTOMER: (state, customer) => state.customers.unshift(customer),

    UPDATE_CUSTOMER: (state, customer) => {
        const index = state.customers.findIndex(customer => customer.id === customer.id);

        if (index !== -1) {
            state.customers.splice(index, 1, customer);
        }
    },

    DELETE_CUSTOMER: (state, customerID) => {
        state.customers = state.customers.filter(customer => customer.id === customerID);
    },
}

export default { state, actions, getters, mutations }