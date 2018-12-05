// initial state
const state = {
    //all: []
    backgroudColor: 'lightseagreen'
}

// getters
const getters = {}

// actions
const actions = {
    setBackgroundColor({ commit, state }, color) {
        commit('setBackgroundColor', color)
    }
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
    }
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
