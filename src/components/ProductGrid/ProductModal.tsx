import { SingleProduct } from "@/interfaces/products/single-product";
import Image from "next/image";
import Link from "next/link";
import { IoCart, IoClose, IoHeartOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";

interface Props {
  product: SingleProduct,
  closeModal: () => void;
}

export const ProductModal = ({ product, closeModal }: Props) => {

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800 absolute justify-center w-screen">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border shadow-lg  p-3 z-10">
        <div className="mt-2 mb-8 w-full">
          <div className="flex justify-end mr-3">
            <IoClose 
              className="hover:cursor-pointer"
              size={30} 
              onClick={closeModal}
            />
          </div>
          <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
            #{product.productId} {product.title}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <Image
              src={ product.image }
              width={150}
              height={150}
              alt={`Product's image ${product.title}`}
              className="mb-5 mt-5"
            />
            <div className="flex flex-wrap">
              <p className="mr-2 mb-2 capitalize">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 drop-shadow-lg ">
            <p className="text-sm text-gray-600">Available</p>
            <div className="text-base font-medium text-navy-700">
              <span className="mr-2 capitalize">{product.totalInInventory}</span>
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm text-gray-600">
              Price
            </p>
            <span className="text-base font-medium text-navy-700">
              ${ product.price }
            </span>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <span className="text-base font-medium text-navy-700 flex hover:text-blue-600 hover:cursor-pointer">

              <Link 
                className="text-white text-center bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-lg w-full px-5 py-2.5"
                href={`catalog/product/${ product.productId }`}
              >
              View full details
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
