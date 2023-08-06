import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineEmail } from '@styles';
import { ErrorContainer, FormGroup } from '../styles';
import { SetCookie, baseUrl, loginFormErrors } from '@utils';

import { useRouter } from 'next/router';

import { LoadingPage } from '@components';

interface Props {
  setPage: (page: number) => void;
}

interface Inputs {
  email: string;
}

export const RecoveryComponent: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    /* watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const [loader, setLoader] = React.useState<boolean>(false);
  const [error, setError] = React.useState({
    status: false,
    type: '',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email } = data;

    if (!email) {
      setError({
        status: true,
        type: 'email',
      });
    }

    const url = `${baseUrl}api/login/recovery`;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    };

    try {
      setLoader(true);

      const response = await fetch(url, options);

      if (response.status === 401) {
        setLoader(false);
        setError({
          status: true,
          type: 'invalid',
        });
        return;
      }

      if (response.status === 500) {
        setLoader(false);
        setError({
          status: true,
          type: 'server',
        });
        return;
      }

      const optionsCookie = {
        path: '/',
        maxAge: 3600 * 24, // Expires after 1 day
        sameSite: 'strict', // 'strict', 'lax', ou 'none' (dependendo dos requisitos do seu projeto)
      };

      SetCookie('emailuser', email, optionsCookie);

      if (response.status === 200) props.setPage(3);
    } catch (error) {
      setLoader(false);
      console.error('Erro ao processar requisição:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleVisitor = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    router.push('/dash');
  };

  return (
    <>
      {!loader && (
        <Col className="d-flex flex-column align-items-center" xs="auto">
          <Form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Col xs="auto">
              <Col>
                <h4>Confirmação de Email</h4>
              </Col>
              <Col className="msg-secondary">
                <p>
                  Por favor, informe o email associado à sua conta para que
                  possamos enviar um código de recuperação.
                </p>
              </Col>
            </Col>

            <FormGroup controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                {...register('email', {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                style={{
                  border: `2px solid ${
                    errors.email || error.status ? 'red' : '#01C88C'
                  }`,
                }}
              />
              <div className="icon">
                <MdOutlineEmail />
              </div>
            </FormGroup>

            {errors.email && (
              <ErrorContainer>
                <p>{loginFormErrors.email}</p>
              </ErrorContainer>
            )}

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                <button type="submit">
                  <h5>Enviar Código</h5>
                </button>
                <Col className="forgot">
                  <a onClick={() => props.setPage(1)}>fazer login</a>
                </Col>
              </Col>

              <Col className="msg-secondary visit">
                {!error.type && error.type === '' && (
                  <p>
                    Não é o administrador? entre como
                    <a onClick={handleVisitor} style={{ cursor: 'pointer' }}>
                      {' '}
                      Visitante
                    </a>
                  </p>
                )}
              </Col>

              {error.status && error.type === 'invalid' && (
                <ErrorContainer>
                  <p>{loginFormErrors.email}</p>
                </ErrorContainer>
              )}

              {error.status && error.type === 'server' && (
                <ErrorContainer>
                  <p>{loginFormErrors.server}</p>
                </ErrorContainer>
              )}
            </Col>
          </Form>
        </Col>
      )}

      {loader && <LoadingPage />}
    </>
  );
};
