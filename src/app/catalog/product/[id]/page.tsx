import { AddToCartWithQuantity } from '@/components';
import { SingleProduct } from '@/interfaces';
import { getSingleProduct } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: { 
    id: string 
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  try {  
    const product: SingleProduct = await getSingleProduct(params.id);

    return {
      title: `#${ product.productId } - ${ product.title }`,
      description: `Details of the product ${product.title}`,
    }
    
  } catch (error) {

    return {
      title: 'Product page',
      description: 'Details of the product',
    } 
  }
}

const ProductPage = async ({ params }: Props) => {

  const product: SingleProduct = await getSingleProduct(params.id);
  
  return (
    <div className='mt-5 mb-20 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
      <div className='col-span-1 lg:col-span-2'>
        <Image 
        src={product.image}
        alt={product.title}
        sizes='100vw'
        width={0}
        height={0}
        objectFit='cover'
        style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className='col-span-1 lg:col-span-2 px-5'>
        <h1 className={` antialiased font-bold text-xl `}>
          { product.title }
        </h1>
        <p className='text-lg mb-5'>
          ${ product.price }
        </p>

        <h3 className='font-bold text-sm'>
          Quantity
        </h3>

        <AddToCartWithQuantity product={ product }/>

        <h3 className='font-bold text-sm'>
          Description
        </h3>
          <p className='font-light'>
            { product.description }
          </p>
      </div>
    </div>
  )
}

export default ProductPage;