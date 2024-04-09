import { Catalog, IsAuth, Title } from '@/components';
import React from 'react';

const CatalogPage = async () => {
  return (
    <IsAuth>
      <Title text={'Product Catalog'}/>
      <Catalog />
    </IsAuth>
  )
}

export default CatalogPage;
