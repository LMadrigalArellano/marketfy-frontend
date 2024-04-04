import { SingleProduct } from "@/interfaces/products/single-product";
import { notFound } from "next/navigation";

export const getSingleProduct = async (productId: string): Promise<SingleProduct> => {

  try {
    const product: SingleProduct = await fetch(`http://localhost:8080/marketfy/api/products/${productId}`)
    .then((res) => res.json())
    .then((json) => json);
  
    return product;
    
  } catch (error) {
    notFound();
  }
}