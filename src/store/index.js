import { createStore } from 'vuex'
import shop from "@/api/shop";

export const store = createStore({
    state: { // data
        products: [],
        // {id, quantity}
        cart: []
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

        },

        addProductToCart(context, product){
            if(product.inventory > 0){
                const cartItem = context.state.cart.find(item => item.id === product.id)
                if(!cartItem){
                    context.commit('pushProductToCart', product.id)
                } else {
                    context.commit('incrementItemQuantity', cartItem)
                }
                context.commit('decrementProductInventory', product)

            } else {
                //show out of stock method
            }
        }
    },

    mutations: {
        setProducts (state, products) {
            // update products
            state.products = products
        },
        pushProductToCart (state, productId){
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem){
            cartItem.quantity++
        },

        decrementProductInventory(state, cartItem){
            cartItem.inventory--
        }
    }
})

