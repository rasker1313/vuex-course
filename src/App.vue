<template>
  <ProductList />
  <hr/>
  <ShoppingCart />
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShoppingCart from "@/components/ShoppingCart";

export default {
  name: 'App',
  components: {
    ShoppingCart,
    ProductList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
