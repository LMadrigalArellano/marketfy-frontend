'use client'

import { SingleProduct } from "@/interfaces";
import { useAppDispatch } from "@/lib/store";
// import { toggleFromWishList } from "@/lib/store/products/products-store";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

interface Props {
  product: SingleProduct,
}

const ToggleFromWishListButton = ({ product }: Props) => {

  const iconStyling = "text-red-600 w-[30px] h-[30px]"

  const dispatch = useAppDispatch();

  const handleToggleFromWishList = () => {
    // dispatch( toggleFromWishList(product) );
  }

  return (
    <div onClick={handleToggleFromWishList}>
      {/* {
        product.inWishList 
          ? <IoHeart className={iconStyling} /> 
          : <IoHeartOutline className={iconStyling} />
      } */}
    </div>
  )
}

export { ToggleFromWishListButton };
