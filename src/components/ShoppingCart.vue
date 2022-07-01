<template>
  <div>
    <h1>Shopping cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{$currency(product.price)}} - {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{$currency(total)}}</p>
    <button @click="checkout">Checkout</button>
    <p v-if="checkoutStatus">{{checkoutStatus}}</p>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: "ShoppingCart",
  computed:{
    ...mapGetters({
      products: "cartProducts",
      total: 'cartTotal'
    }),
    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })
  },
  methods:{
    ...mapActions({
      checkout: 'checkout'
    })
  }
}
</script>

<style scoped>

</style>