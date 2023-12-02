import React from 'react';
import type { NextPage } from 'next';

import { CardLogin } from '../styles/pages/login/styles';

import { Container } from '@layout';
import {
  LoginComponet,
  ChangePasswordComponent,
  ConfirmCodeComponent,
  RecoveryComponent,
  AuthTwoStep,
} from '@components';

const image = 'https://i.imgur.com/NIkBDgT.jpg';

const Login: NextPage = () => {
  const [page, setPage] = React.useState<number>(1);

  const getPageComponent = (page: number) => {
    switch (page) {
      case 1:
        return <LoginComponet setPage={(page) => setPage(page)} />;
      case 2:
        return <AuthTwoStep />;
      case 3:
        return <ConfirmCodeComponent setPage={(page) => setPage(page)} />;
      case 4:
        return <ChangePasswordComponent setPage={(page) => setPage(page)} />;
      case 5:
        return <RecoveryComponent setPage={(page) => setPage(page)} />;
      default:
        return <p>Nenhuma página disponível</p>;
    }
  };

  return (
    <Container background={image}>
      <CardLogin xs={12}>
        <>{getPageComponent(page)}</>
      </CardLogin>
    </Container>
  );
};

export default Login;
