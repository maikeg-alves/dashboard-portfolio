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
  const [page, setPage] = React.useState<number>(2);

  let setComponent: React.ReactElement;

  switch (page) {
    case 1:
      setComponent = <LoginComponet setPage={(page) => setPage(page)} />;
      break;
    case 2:
      setComponent = <AuthTwoStep />;
      break;
    case 3:
      setComponent = <ConfirmCodeComponent setPage={(page) => setPage(page)} />;
      break;
    case 4:
      setComponent = (
        <ChangePasswordComponent setPage={(page) => setPage(page)} />
      );
      break;
    case 5:
      setComponent = <RecoveryComponent setPage={(page) => setPage(page)} />;
      break;
    default:
      setComponent = <p>Nenhuma página disponível</p>;
      break;
  }

  return (
    <Container background={image}>
      <CardLogin xs={12}>
        <>{setComponent}</>
      </CardLogin>
    </Container>
  );
};

export default Login;
