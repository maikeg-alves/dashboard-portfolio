import { useRouter } from 'next/router';
import React from 'react';
import { Col } from 'react-bootstrap';

interface BodyLoginProps {
  children: React.ReactNode;
}

const BodyLogin: React.FC<BodyLoginProps> = ({ children }) => {
  const router = useRouter();

  const handleVisitor = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    router.push('/dash');
  };

  return (
    <>
      <Col className="d-flex flex-column align-items-center" xs="auto">
        <>{children}</>
        <Col className="msg-secondary visit">
          <p>
            Não é o administrador? entre como
            <a onClick={handleVisitor} style={{ cursor: 'pointer' }}>
              {' '}
              Visitante
            </a>
          </p>
        </Col>
      </Col>
    </>
  );
};

export default BodyLogin;
