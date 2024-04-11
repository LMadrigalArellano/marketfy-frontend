import { SingleProduct } from "@/interfaces/products/single-product";
import { notFound } from "next/navigation";
import useFetch from "./CustomHooks/useFetch";

export const fetchSingleProduct = async (id: number): Promise<SingleProduct> => {

  try {
    const product: (SingleProduct | null) = useFetch(`http://localhost:8080/marketfy/api/products/${id}`).data;
  
    if(product === null){
      notFound();
    } else{

      return product;
    }
    
  } catch (error) {
    notFound();
  }
}