import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type ProductProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
};

const Product: React.FC<{ product: ProductProps }> = ({ product }) => {
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${product.id}`)}>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <small>Price: ${product.price}</small>
      <ReactMarkdown children={product.description} />

      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }

        img {
          max-height: 300px;
          object-fit: contain;
          width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Product;
