'use client';

import Link from "next/link";
import Image from "next/image";
import { SingleProduct } from "@/interfaces/products/single-product";
import { AddToCartButton, ToggleFromWishListButton } from "..";
import { usePathname } from 'next/navigation';
import { ProductModal } from "./ProductModal";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props { 
  product: SingleProduct
}

export const ProductCard = ({ product }: Props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [src, setSrc] = useState('');

  const pathName = usePathname();
  const { productId, title, image, price } = product;

  return (
    <>
      <div className="rounded-md fade-inm-10 w-80">
        <div className="relative">
          <Image 
            src={ image }
            alt={ title }
            className="w-full object-cover max-h-52 min-h-52 cursor-pointer transition-opacity hover:opacity-95"
            width={300}
            height={300}
            priority={false}
            onClick={() => setIsModalOpen(true)}
          />
          <div className="absolute bottom-0 right-0 p-1">
          <ToggleFromWishListButton product={product}/>

          </div>
        </div>
        <div className="p-4 flex flex-col">
          <Link 
            className="hover:text-blue-600"
            href='/'
            // href={`catalog/product/${ productId }`}
          >
            {title}
          </Link>
          <span className="font-bold">${price}</span>
          {/* {
            pathName === '/wishlist'
            &&
            <AddToCartButton product={{...product, quantity: 1}}/>
          } */}
        </div>
      </div>    

      {
      isModalOpen 
      && 
      (
        <>
          <div 
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />
          <div
            onClick={ () => setIsModalOpen( false )}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
          <ProductModal product={product} closeModal={() => setIsModalOpen(false)} />
        </>
      )
      }
    </>
  )
}
