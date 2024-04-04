'use client'

import { AddToCartButton, QuantitySelector } from "@/components";
import { CartProduct, SingleProduct } from "@/interfaces";
// import { useAppDispatch } from "@/lib/store";
// import { addProductToCart, calculateTotalItems, setSummaryInformation } from "@/lib/store/cart/cart-store";
import { useState } from "react";

interface Props {
  product: SingleProduct,
}

export const AddToCartWithQuantity = ({ product }: Props) => {

  const [quantity, setQuantity] = useState<number>(1);

  const cartProduct: CartProduct = {
    productId: product.productId,
    title: product.title,
    price: product.price,
    quantity: quantity,
    image: product.image
  }

  return (
    <>
      <QuantitySelector quantity={cartProduct.quantity} onQuantityChanged={setQuantity}/>

      <AddToCartButton product={cartProduct}/>
    </>
  )
}
