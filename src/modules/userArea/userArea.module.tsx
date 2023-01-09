import React from 'react';
import { Container } from './styles';

type Props = {
  values: string;
};

const UserArea: React.FC<Props> = (props) => {
  return (
    <Container>
      <p>area de login do ussuario</p>
    </Container>
  );
};

export default UserArea;
