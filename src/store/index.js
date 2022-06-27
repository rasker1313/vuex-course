import { createStore } from 'vuex'

export const store = createStore({
    state: { // data
        products: []
    },

    getters: { // computed properties
        availableProducts(state){
            return state.products.filter(product => product.inventory > 0)
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

