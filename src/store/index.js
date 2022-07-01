import { createStore } from 'vuex'
import shop from "@/api/shop";

export const store = createStore({
    state: { // data
        products: [],
        // {id, quantity}
        cart: [],
        checkoutStatus: null
    },

    getters: { // computed properties
        availableProducts(state){
            return state.products.filter(product => product.inventory > 0)
        },
        cartProducts (state){
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },
        cartTotal(state, getters){
            // Second type
            /*let total = 0
            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })
            return total*/
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        },
        productIsInStock () {
            return(product) => {
                return product.inventory > 0
            }
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

        addProductToCart({state, getters, commit}, product){
            if(getters.productIsInStock(product)){
                const cartItem = state.cart.find(item => item.id === product.id)
                if(!cartItem){
                    commit('pushProductToCart', product.id)
                } else {
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decrementProductInventory', product)

            }
        },

        checkout({state, commit}){
            shop.buyProducts(
                state.cart,
                () => {
                    commit('emptyCart')
                    commit('setCheckoutStatus', 'success')
                },
                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
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
        },

        setCheckoutStatus(state, status){
            state.checkoutStatus = status
        },

        emptyCart(state){
            state.cart = []
        }
    }
})

