<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{$currency(product.price)}} - {{product.inventory}}
        <button
            :disabled="!productIsInStock(product)"
            @click="addProductToCart(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
export default {
  name: "ProductList",
  data(){
    return{
      loading: false
    }
  },
  computed: {
    ...mapState({
      products: state => state.products
    }),
    ...mapGetters({
      productIsInStock: 'productIsInStock'
    }),
  },
  methods:{
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addProductToCart: 'addProductToCart'
    }),
  },
  created(){
    this.loading = true
    this.fetchProducts()
        .then(() => this.loading = false)
  }
}
</script>

<style scoped>

</style>