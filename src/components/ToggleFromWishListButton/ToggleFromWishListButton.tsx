'use client'

import { SelectionState, SingleProduct, UsersState } from "@/interfaces";
import { fetchSelectionProducts, fetchWishlistProducts, toggleFromWishlist } from "@/lib/features/selection/selection-store";
import { useAppDispatch, useAppSelector } from "@/lib/store";
// import { toggleFromWishList } from "@/lib/store/products/products-store";
import { IoHeart, IoHeartOutline } from 'react-icons/io5';

interface Props {
  product: SingleProduct,
}

const ToggleFromWishListButton = ({ product }: Props) => {

  const iconStyling = "text-red-600 w-[30px] h-[30px] hover: cursor-pointer";
  const selectionState: SelectionState = useAppSelector(state => state.selection);
  const usersState: UsersState = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();

  const handleToggleFromWishList = () => {
    let selectionRecord = selectionState.products.find((element) => ((element.productId === product.productId)));

    if(selectionRecord === undefined){
      //Will add record to the wishlist
      selectionRecord = {
        id: 0,
        userId: parseInt(usersState.loggedUser!.userId),
        productId: product.productId,
        productQuantity: 1,
        storedIn: '',
      }
    }

    dispatch( toggleFromWishlist(selectionRecord) ).then(() => {
      dispatch(fetchSelectionProducts(usersState.loggedUser!.userId));
      dispatch(fetchWishlistProducts(selectionState.products));
    });
  }

  return (
    <div onClick={handleToggleFromWishList}>
      {
        selectionState.wishlist.some( item => item.productId === product.productId)
          ? <IoHeart className={iconStyling} /> 
          : <IoHeartOutline className={iconStyling} />
      }
    </div>
  )
}

export { ToggleFromWishListButton };
