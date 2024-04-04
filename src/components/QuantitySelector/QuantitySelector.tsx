'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: ( value: number ) => void; 
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

  const handleQuantityChange = ( value:number ) => {
    if( quantity + value < 1 ) return;

    onQuantityChanged( quantity + value );
  }

  return (
    <div className="flex">
      <button onClick={() => handleQuantityChange( -1 )} >
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 rounded bg-gray-100 text-center">
        { quantity }
      </span>
      <button onClick={() => handleQuantityChange( 1 )} >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
