import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type ProductProps = {
  id: number;
  title: string;
  image: string;
  price: number;
};

const Post: React.FC<{ post: ProductProps }> = ({ post }) => {
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      {JSON.stringify(post)}
      {/* <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style> */}
    </div>
  );
};

export default Post;
