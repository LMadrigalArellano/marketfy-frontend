'use client';

import { fetchPaginatedProducts } from "@/lib/features/products/products-store";
import { useAppDispatch } from "@/lib/store";
import { generatePaginationNumbers } from "@/utils";
import { redirect, usePathname, useSearchParams, useRouter } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const router = useRouter();
  
	const dispatch = useAppDispatch();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageString = searchParams.get('pageIndex') ?? 1;
  const isCurrentPageANumber = !isNaN( +pageString );
  const currentPage =  !isCurrentPageANumber ? 1 : +pageString;
  if(currentPage < 1 || !isCurrentPageANumber){
    redirect(pathname);
  }

  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const handlePageChange = (pageNumber: number | string) => {
    if( typeof(pageNumber) === 'string') {
      return;
    }

    const params = new URLSearchParams( searchParams );
    
    if( typeof(pageNumber) === 'string') {
      return router.push(`${ pathname }?${ params.toString() }`);
    }
    if( pageNumber <= 0) {
      return router.push(`${ pathname }`);
    }

    if( +pageNumber > totalPages ) {
      return router.push(`${ pathname }?${ params.toString()}`);
    }

    params.set('pageIndex', pageNumber.toString());
    router.push(`${ pathname }?${ params.toString() }`);

    dispatch( fetchPaginatedProducts({pageIndex: pageNumber - 1 , pageSize: 9}) );
  }


  return (
    <div className="flex justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item disabled">
            <button
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              onClick={ () => handlePageChange(currentPage - 1) }              
            >
              <IoChevronBackOutline size={30}/>
            </button>
          </li>
          {
            allPages?.map( (page, index) => (
            <li key={index} className="page-item">
              <button
                className={
                  `"page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded focus:shadow-none"
                  ${
                    page === currentPage
                    ?"bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-700"
                    :"text-gray-800 hover:text-gray-800 hover:bg-gray-200 "
                  }`
                }
                onClick={ () => handlePageChange(page) }
                >
                { page }
              </button>
            </li>
            ))
          }
          
          <li className="page-item">
            <button
              className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              onClick={ () => handlePageChange(currentPage + 1) }
            >
              <IoChevronForwardOutline size={30}/>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
