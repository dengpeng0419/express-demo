// initial state
const state = {
    //all: []
    backgroudColor: 'lightseagreen',
    settingNar: '1'
}

// getters
const getters = {}

// actions
const actions = {
    setBackgroundColor({ commit, state }, color) {
        commit('setBackgroundColor', color)
    },
    recordChosenNar({ commit, state }, index) {
        commit('recordChosenNar', index)
    },
    // getAllProducts ({ commit }) {
    //     shop.getProducts(products => {
    //         commit('setProducts', products)
    //     })
    // }
}

// mutations
const mutations = {
    setBackgroundColor(state, status) {
        state.backgroudColor = status;
    },
    recordChosenNar(state, status) {
        state.settingNar = status;
    },
    // setProducts (state, products) {
    //     state.all = products
    // },
    //
    // decrementProductInventory (state, { id }) {
    //     const product = state.all.find(product => product.id === id)
    //     product.inventory--
    // }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
