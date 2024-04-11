import { SingleProduct } from "@/interfaces/products/single-product";
import { notFound } from "next/navigation";

interface Props {
  userId: number;
  orderId: number;
}

export const fetchSingleProduct = async ({userId, orderId}: Props): Promise<SingleProduct> => {

  try {
    const product: SingleProduct = await fetch(`http://localhost:8080/marketfy/api/users/${userId}/orders/${orderId}`)
    .then((res) => res.json())
    .then((json) => json);
  
    return product;
    
  } catch (error) {
    notFound();
  }
}