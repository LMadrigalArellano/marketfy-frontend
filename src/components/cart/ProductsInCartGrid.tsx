'use client'

import { CartProduct } from "@/interfaces";
import ProductInCart from "./ProductInCart"
import { useAppSelector } from "@/lib/store";

const ProductsInCartGrid = () => {

  const productsInCart: CartProduct[] = useAppSelector(state => state.cart.cart);
  
  return (
    <div>
      {
        productsInCart.map( product => (
          <ProductInCart key={product.productId} product={product} />
        )) 
      }
    </div>
  )
}

export default ProductsInCartGrid;

