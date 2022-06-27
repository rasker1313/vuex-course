import { createStore } from 'vuex'
import shop from "@/api/shop";

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
        fetchProducts (context) {
            return new Promise((resolve, dispatch) => {
                // make the call
                // run setProducts mutation
                shop.getProducts(products => {
                    context.commit('setProducts', products)
                    resolve()
                    dispatch()
                })
            })

        }

        // Example
        /*addToCart(context, product){
            if(product.inventory > 0){
                context.commit('pushProductToCart', product)
            } else {
                //show out of stock method
            }
        }*/
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        }
    }
})

