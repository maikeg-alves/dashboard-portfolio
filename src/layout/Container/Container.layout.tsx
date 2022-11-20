import React from 'react';
import { NextPage } from 'next';
import { MYContainer } from './styles';
import { Row } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  title?: string;
  page?: boolean;
  background?: string;
};

const Container: NextPage<Props> = ({
  children,
  justify,
  align,
  direction,
  background,
}) => {
  return (
    <>
      <MYContainer
        back={background}
        className={`${background && `position-absolute`}`}
      >
        {justify || align || direction ? (
          <Row
            className={`justify-content-${justify} align-items-${align} flex-${direction}`}
            style={{ width: '100%' }}
          >
            {children}
          </Row>
        ) : (
          <Row
            className={`justify-content-center align-items-center flex-column`}
            style={{ width: '100%', height: '100vh' }}
          >
            {children}
          </Row>
        )}
      </MYContainer>
    </>
  );
};

export default Container;
