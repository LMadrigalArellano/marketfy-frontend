import { Catalog, Title } from '@/components';
import React from 'react';

const CatalogPage = async () => {
  return (
    <>
      <Title text={'Product Catalog'}/>
      <Catalog />
    </>
  )
}

export default CatalogPage;
