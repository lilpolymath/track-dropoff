import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { ProductProps } from '../../components/Product';
import { FAKESTORE_BASE_URL } from '../../utils/constants';

const Post: React.FC<ProductProps> = ({ ...props }) => {
  const addToCart = async (props: ProductProps): Promise<void> => {
    try {
      const body = { email, product: { ...props } };
      await fetch(`${BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromCart = async (id: number): Promise<void> => {
    try {
      const body = { email, product: { ...props } };
      await fetch(`${BASE_URL}/cart`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  console.log(props);

  return (
    <Layout>
      <div>
        <img src={props.image} alt={props.title} />
        <h2>{props.title}</h2>
        <small>Price: ${props.price}</small>
        <ReactMarkdown children={props.description} />
        <button onClick={() => addToCart(props)}>Add to Cart</button>
        <button onClick={() => removeFromCart(props.id)}>
          Remove from Cart
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          width: 100%;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `${FAKESTORE_BASE_URL}/products/${context.params.id}`
  );
  const data = await res.json();
  return { props: { ...data } };
};

export default Post;
