import { createStore } from 'vuex'

export const store = createStore({
    state: { // data
        products: []
    },

    getters:{ // computed properties
        productsCount () {

        }
    },

    actions: {
        fetchProducts () {
            // make the call
            // run setProducts mutation
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})

