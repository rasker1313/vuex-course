<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{$currency(product.price)}} - {{product.inventory}}
        <button @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data(){
    return{
      loading: false
    }
  },
  computed: {
    products (){
      return this.$store.getters.availableProducts
    }
  },
  methods:{
    addProductToCart(product){
      this.$store.dispatch('addProductToCart', product)
    }
  },
  created(){
    this.loading = true
    this.$store.dispatch('fetchProducts')
        .then(() => this.loading = false)
  }
}
</script>

<style scoped>

</style>