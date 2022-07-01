<template>
  <div>
    <h1>Shopping cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{$currency(product.price)}} - {{product.quantity}}
      </li>
    </ul>
    <p>Total: {{$currency(total)}}</p>
    <button @click="this.$store.dispatch('checkout')">Checkout</button>
    <p v-if="this.$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
  </div>
</template>

<script>

export default {
  name: "ShoppingCart",
  computed:{
    products () {
      return this.$store.getters.cartProducts
    },
    total () {
      return this.$store.getters.cartTotal
    }
  },
  methods:{

  }
}
</script>

<style scoped>

</style>