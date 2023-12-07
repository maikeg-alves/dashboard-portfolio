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
import { GetCookie } from '@utils';
import { useRouter } from 'next/router';

const image = 'https://i.imgur.com/NIkBDgT.jpg';

const Login: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = React.useState<number>(1);

  const getPageComponent = (page: number) => {
    if (page >= 1 && page <= 5) {
      switch (page) {
        case 1:
          return <LoginComponet setPage={setPage} />;
        case 2:
          return <AuthTwoStep />;
        case 3:
          return <ConfirmCodeComponent setPage={setPage} />;
        case 4:
          return <ChangePasswordComponent setPage={setPage} />;
        case 5:
          return <RecoveryComponent setPage={setPage} />;
        default:
          return <p>Nenhuma página disponível</p>;
      }
    } else {
      console.error('Página inválida:', page);
      return <p>Página inválida</p>;
    }
  };

  if (GetCookie('accesstoken')) {
    router.push('/dash');
  }

  return (
    <Container background={image}>
      <CardLogin xs={12}>
        <>{getPageComponent(page)}</>
      </CardLogin>
    </Container>
  );
};

export default Login;
