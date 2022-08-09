import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

import Layout from '../components/Layout';

import main, { DeviceDetails } from '../utils/device-tracking';
import { BASE_URL, FAKESTORE_BASE_URL } from '../utils/constants';

type Props = {
  ipAddress: string;
};

const Products: React.FC<Props> = ({ ipAddress }) => {
  const [deviceDetails, setDeviceDetails] = useState<DeviceDetails>({});
  useEffect(() => {
    setDeviceDetails(main());
  }, []);

  return (
    <Layout>
      <div className='page'>
        <h1>Device Tracking Details</h1>
        <main>
          <code>{JSON.stringify({ deviceDetails, ipAddress })}</code>
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
  const getIPAddress = await fetch(`${BASE_URL}/ip-address`);
  const address = await getIPAddress.json();

  return {
    props: { products, ipAddress: address.ipAddress },
  };
};

export default Products;
