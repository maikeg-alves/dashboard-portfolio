import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import { Layout } from '../layout';
import { DataProvider } from '@hook';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <DataProvider>
          <Component {...pageProps} />
        </DataProvider>
        <GlobalStyle />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
