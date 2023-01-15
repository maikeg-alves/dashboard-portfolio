import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Container } from './styles';

type Props = {
  admin: boolean;
};

const UserArea: React.FC<Props> = (props) => {
  const router = useRouter();

  const logout = () => {
    localStorage.getItem('token') && localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <Container>
      <Col xs="auto" className=" my-3">
        <Image
          src={`${
            props.admin
              ? 'https://i.imgur.com/p7LZCvN.png'
              : 'https://i.imgur.com/YYNLL6b.jpgs'
          }`} /* */
          alt="avatar user"
          width={125}
          height={125}
        />
      </Col>
      <Col xs="auto" className="text-center">
        <h3>{props.admin ? 'Maicon Gabriel Alves' : 'Usuário'}</h3>
        <p>{props.admin ? 'Administrador' : 'visitante'}</p>
      </Col>

      {props.admin && (
        <Col xs={12} className="alert">
          <p>
            Atenção: o token de acesso ao dashbord tem validade de 24 horas.
            Após esse período, será necessário se logar novamente para continuar
            acessando o dashbord. Tenha isso em mente para garantir que você
            sempre tenha acesso aos dados e funcionalidades do dashbord.
          </p>
        </Col>
      )}

      {!props.admin && (
        <Col className="alert" xs={12}>
          <p>
            Você pode ver os dados do dashbord, mas não pode editar, criar ou
            excluir projetos. Para ter essas opções, precisa se logar como
            administrador. Isso lhe dará acesso total ao dashbord
          </p>
        </Col>
      )}

      <Col xs="auto" className="logout">
        <button onClick={logout}>logout</button>
      </Col>
    </Container>
  );
};

export default UserArea;
