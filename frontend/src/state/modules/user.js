import userApi from '../../api/userApi'

const state = {
    users: [],
    user: {}
}

const actions = {
    async getUsers({ commit }) {
        const res = await userApi.all()
        .catch(err => {
            console.log(err);
            return false
        });

        if (res.status === 200){
            commit('SET_USERS', res.data);
            return true;
        }
    },
    async  getUserById({ commit }, userID){
        const res = await userApi.show(userID)
        .catch(err => {
            console.log(err);
            return false;
        });

        if (res.status == 200) {
            commit('SET_USER', res.data);
            return true;
        }
    },
    async updateUser({ commit }, user) {
        const res = await userApi.update(user)
        .catch(err => {
            console.log(err);
            return false
        })

        if (res.status === 200){
            commit('UPDATE_USER', user);
            return true;
        }
    }

}

const mutations = {
    SET_USERS: (state, users) => state.users = users,

    SET_USER: (state, user) => state.user = user,

    UPDATE_USER: (state, user) => {
        const index = state.users.findIndex(user => user.id === user.id);

        if (index !== -1) {
            state.user.splice(index, 1, user);
        }
    },
}

export default { state, actions, mutations }