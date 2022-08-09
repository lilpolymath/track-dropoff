import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Product, { ProductProps } from '../components/Product';
import main from '../utils/device-tracking';
import { BASE_URL } from '../utils/contants';

type Props = {
  products: ProductProps[];
  ipAddress: string;
};

const Products: React.FC<Props> = ({ products, ipAddress }) => {
  useEffect(() => {
    const deviceDetails = main();

    console.log({ deviceDetails, ipAddress });
  }, []);

  return (
    <Layout>
      <div className='page'>
        <h1>Products</h1>
        <main>
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

        .product + .product {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  const products = await res.json();

  const getIPAddress = await fetch(`${BASE_URL}/ip-address`);
  const address = await getIPAddress.json();

  return {
    props: { products, ipAddress: address.ipAddress },
  };
};

export default Products;
