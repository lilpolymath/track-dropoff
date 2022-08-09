import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';

import Layout from '../components/Layout';
import Product, { ProductProps } from '../components/Product';

import main from '../utils/device-tracking';
import { BASE_URL, FAKESTORE_BASE_URL } from '../utils/constants';

type Props = {
  products: ProductProps[];
};

const Products: React.FC<Props> = ({ products }) => {
  return (
    <Layout>
      <div className='page'>
        <h1>Products</h1>
        <main className='products'>
          {products?.map((product) => (
            <div key={product.id} className='product'>
              <Product product={product} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .product {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .product:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .products {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${FAKESTORE_BASE_URL}/products/`);
  const products = await res.json();

  return {
    props: { products },
  };
};

export default Products;
