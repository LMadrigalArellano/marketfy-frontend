'use client';

import { ProductCard } from "./ProductCard";
import { ProductsState } from "@/interfaces";

interface Props {
  productsState: ProductsState;
}

export const ProductGrid = ({ productsState }: Props) => {

  if(productsState.loading) return <p>Loading...</p>;
  if(productsState.products.length === 0) return <p>No products</p>;

  return (
    <div className='grid place-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 m-10 gap-10'>
      {
        productsState.products
        .map((product) => (
            <ProductCard 
              key={product.productId} 
              product={ product }
            />
        ))
      }
    </div>
  )
}
