'use client'

import { CartProduct, SingleProduct } from "@/interfaces";
import { useAppDispatch } from "@/lib/store";
// import { addProductToCart, calculateTotalItems, setSummaryInformation } from "@/lib/store/cart/cart-store";

interface Props {
  product: CartProduct,
}

export const AddToCartButton = ({ product }: Props) => {

  const cartProduct: CartProduct = {
    productId: product.productId,
    title: product.title,
    price: product.price,
    quantity: product.quantity,
    image: product.image
  }

  const dispatch = useAppDispatch();

  // const handleAddToCart = () => {
  //   dispatch( addProductToCart(cartProduct) );
  //   dispatch( calculateTotalItems() );
  //   dispatch( setSummaryInformation() );
  // }

  return (
    <>
      <button 
        className='btn-primary my-5'
        // onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </>
  )
}
