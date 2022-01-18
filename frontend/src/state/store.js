import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'
import equipment from './modules/equipment'
import user from './modules/user'
import employee from './modules/employee';

import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        ...modules,
        customer,
        equipment,
        user,
        employee
    },
    // Enable strict mode in development to get a warning
    // when mutating state outside of a mutation.
    // https://vuex.vuejs.org/guide/strict.html
    strict: process.env.NODE_ENV !== 'production',
})

export default store