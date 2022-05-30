const cart = reactive({
  items: [] as CartItem[],
});

export const useCart = (): any => {
  const addToCart = (product: Product): void => {
    const item = cart.items.find((item) => item.productId === product.id);
    if (item) {
      updateQuantity(item, item.quantity + 1);
    } else {
      cart.items.push({
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
      });
    }
  };

  const updateQuantity = (item: CartItem, quantity: number) => {
    item.quantity = quantity;
  };

  const totalProducts = computed(() => {
    return cart.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  });
  return {
    cart,
    addToCart,
    totalProducts,
    updateQuantity,
  };
};
