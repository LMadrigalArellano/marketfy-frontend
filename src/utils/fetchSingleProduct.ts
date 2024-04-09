import { SingleProduct } from "@/interfaces/products/single-product";
import { notFound } from "next/navigation";

export const fetchSingleProduct = async (id: number): Promise<SingleProduct> => {

  try {
    const product = await fetch(`http://localhost:8080/marketfy/api/products/${id}`)
    .then((res) => res.json())
    .then((json) => json);
  
    return product;
    
  } catch (error) {
    notFound();
  }
}