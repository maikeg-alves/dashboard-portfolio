import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { MYContainer } from './styles';

type Props = {
  children: React.ReactNode;
  title?: string;
};

const Layout: NextPage<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title ? title : ''}</title>
      </Head>
      <MYContainer>{children}</MYContainer>
    </>
  );
};

export default Layout;
