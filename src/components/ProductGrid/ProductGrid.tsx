'use client';

import { useState } from "react";

import { ProductCard } from "./ProductCard";
import { SearchBar } from "..";
import { ProductsState } from "@/interfaces";

interface Props {
  productsState: ProductsState;
}

export const ProductGrid = ({ productsState }: Props) => {
  const [searchText, setSearchText] = useState('');

  if(productsState.loading) return <p>Loading...</p>
  if(productsState.products.length === 0) return <p>No products</p>

  return (
    <>
      <SearchBar setSearchText={setSearchText}/>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10 gap-10'>
        {
          productsState.products
          .filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()))
          .map((product) => (
              <ProductCard 
                key={product.productId} 
                product={ product }
              />
          ))
        }
      </div>
    </>
  )
}
