<template>
  <ul>
    <li v-for="product in products.items" :key="product.id" border="b" m="b-4">
      <p>quantity: {{ product.quantity }}</p>
      <p>name: {{ product.name }}</p>
      <p>price: {{ product.price }}</p>
      <p>isSale: {{ product.isSale }}</p>
      <button @click="del(product)">删除</button>
      <button @click="updateProduct(product)">更新</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const products = reactive({
  items: [
    {
      id: 0,
      quantity: 20,
      name: '小米9',
      price: 20,
      isSale: false,
    },
    {
      id: 1,
      quantity: 18,
      name: '小米10pro',
      price: 120,
      isSale: true,
    },
    {
      id: 2,
      quantity: 15,
      name: '小米2s',
      price: 220,
      isSale: false,
    },
    {
      id: 3,
      quantity: 10,
      name: '小米mix2',
      price: 200,
      isSale: true,
    },
  ] as ProductModel[],
});

interface ProductModel {
  id: number;
  quantity: number;
  name: string;
  price: number;
  isSale: Boolean;
}

function updateProduct(product: ProductModel) {
  console.log(product);
  product.price--;
  product.isSale = !product.isSale;
}
function del(product: ProductModel) {
  console.log(product);
  products.items = products.items.filter((item) => item.id != product.id);
}
</script>

<style scoped></style>
