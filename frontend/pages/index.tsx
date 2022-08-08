import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Product, { ProductProps } from '../components/Product';

type Props = {
  products: ProductProps[];
};

const Products: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className='page'>
        <h1>Products</h1>
        <main>
          {props.products?.map((product) => (
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

        .product + .product {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/products');
  const products = await res.json();
  return {
    props: { products },
  };
};

export default Products;
