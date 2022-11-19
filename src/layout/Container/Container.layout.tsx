import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { MYContainer } from './styles';
import { Row } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  title?: string;
};

const Container: NextPage<Props> = ({
  children,
  justify,
  align,
  direction,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title ? title : ''}</title>
      </Head>
      <MYContainer>
        {justify || align || direction ? (
          <Row
            className={`justify-content-${justify} align-items-${align} flex-${direction}`}
            style={{ width: '100%' }}
          >
            {children}
          </Row>
        ) : (
          <>{children}</>
        )}
      </MYContainer>
    </>
  );
};

export default Container;
