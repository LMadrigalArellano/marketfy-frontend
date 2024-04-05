import { Dispatch, SetStateAction } from "react"
import { IoSearchOutline } from 'react-icons/io5';

interface Props {
  defaultValue?: string;
  setSearchText: Dispatch<SetStateAction<string>>
}

export const SearchBar = ({defaultValue, setSearchText}: Props) => {
  return (
    <div className="max-w-md mx-auto my-5">   
      <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline size={20}/>
          </div>
          <input 
            type="search" 
            id="product-search" 
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" 
            placeholder="Search products..." 
            defaultValue={defaultValue}
            onChange={(event) => setSearchText(event.target.value)}
          />
      </div>
  </div>
  )
}
