import employeeApi from "../../api/employeeApi";

const state = {
    employees: [],
    employee: {}
}

const actions = {
    getEmployees({ commit }) {
        return new Promise((resolve, eject) => {
            employeeApi
                .all()
                .then((response) => {
                    if (response.status === 200) {
                        commit("SET_EMPLOYEES", response.data);
                        resolve(response);
                    }
                    eject(response);
                })
                .catch((err) => {
                    eject(err);
                });
        })
    },

    storeEmployee({ commit }, data) {
        return new Promise((resolve, eject) => {
            employeeApi
                .store(data)
                .then((response) => {
                    if (response.status === 201) {
                        commit("ADD_EMPLOYEE", response.data);
                        resolve(response);
                    }
                    eject(response);
                })
                .catch((err) => {
                    eject(err)
                });
        })
    },
    getEmployee({ commit }, employeeId) {
        return new Promise((resolve, eject) => {
            employeeApi
                .get(employeeId)
                .then((response) => {
                    if (response.status === 200) {
                        commit("SET_EMPLOYEE", response.data);
                        resolve(response);
                    }
                    eject(response);
                })
                .catch((err) => {
                    eject(err)
                })
        });
    },

    updateEmployee({ commit }, employeeId, data) {
        return new Promise((resolve, eject) => {
            employeeApi
                .update(employeeId, data)
                .then((response) => {
                    if (response.status === 200) {
                        commit("MODIFY_EMPLOYEE", response.data);
                        resolve(response);
                    }
                    eject(response);
                })
                .catch((err) => {
                    eject(err)
                })
        })
    },

    deleteEmployee({ commit }, employeeId) {
        return new Promise((resolve, reject) => {
            employeeApi
                .delete(employeeId)
                .then((response) => {
                    if (response.status === 204) {
                        commit("DELETE_EMPLOYEE", employeeId);
                        resolve(response);
                    }
                    reject(response);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}
const mutations = {
    SET_EMPLOYEES: (state, employees) => state.employees = employees,
    SET_EMPLOYEE: (state, employee) => state.employee = employee,
    ADD_EMPLOYEE: (state, employee) => state.employees.unshift(employee),
    MODIFY_EMPLOYEE: (state, employee) => {
        const index = state.employees.findIndex((employee) => employee.id === employee.id);

        if (index !== -1) {
            state.employees.splice(index, 1, employee);
        }
    },
    DELETE_EMPLOYEE: (state, employeeId) => {
        const index = state.employees.findIndex((employee) => employee.id === employeeId);
        console.log("index : ", index);
        if (index !== -1) {
            state.employees.splice(index, 1);
        }
    }
}

export default {
    state,
    actions,
    mutations
}