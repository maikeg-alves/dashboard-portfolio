import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiLockPasswordLine } from '@styles';
import { ErrorContainer, FormGroup } from '../styles';

import { useRouter } from 'next/router';

import { LoadingPage } from '@components';
import { GetCookie, baseUrl, recoveryPasswordErrors } from '@utils';

interface Props {
  setPage: (page: number) => void;
}

interface Inputs {
  password1: string;
  password2: string;
}

export const ChangePasswordComponent: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const [loader, setLoader] = React.useState<boolean>(false);
  const [error, setError] = React.useState({
    status: false,
    type: '',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password1, password2 } = data;

    if (password1 !== password2) {
      setError({
        status: true,
        type: 'incompatible',
      });
      return;
    }

    const code: string | null = GetCookie('code');
    const recoveryToken: string | null = GetCookie('recoveryToken');

    if (code === null) {
      setError({
        status: true,
        type: 'code',
      });
      return;
    }

    if (recoveryToken === null) {
      setError({
        status: true,
        type: 'token',
      });
      return;
    }

    const url = `${baseUrl}api/login/recovery/changePassword`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${recoveryToken}`,
      },
      body: JSON.stringify({ password: password1, code: +code }),
    };

    try {
      setLoader(true);

      const response = await fetch(url, options);

      const json = await response.json();

      if (!response.ok) {
        setLoader(false);
        setError({
          status: true,
          type: response.status === 401 ? 'code' : 'server',
        });

        throw new Error(
          `Error status code ${response.status} >  ${json.message}`,
        );
      }

      if (response.ok) props.setPage(1);
    } catch (error) {
      setLoader(false);
      if (error instanceof Error) {
        console.error('Erro ao processar requisição:', error.message);
      } else {
        console.error('Erro desconhecido:', error);
      }
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

  console.log(watch(), error);

  return (
    <>
      {!loader && (
        <Col className="d-flex flex-column align-items-center" xs="auto">
          <Form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Col xs="auto">
              <Col>
                <h4>Redefinição de Senha</h4>
              </Col>
              <Col className="msg-secondary">
                <p>
                  Por favor, insira a sua nova senha e confirme-a nos dois
                  campos abaixo.
                </p>
              </Col>
            </Col>

            <FormGroup>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password1', {
                  required: true,
                })}
                style={{
                  border: `2px solid ${
                    errors.password1 || error.status ? 'red' : '#01C88C'
                  }`,
                }}
              />

              <div className="icon">
                <RiLockPasswordLine />
              </div>
            </FormGroup>

            {errors.password1 && (
              <ErrorContainer>
                <p>{recoveryPasswordErrors.password}</p>
              </ErrorContainer>
            )}

            <FormGroup>
              <Form.Control
                type="password"
                placeholder="Confirmar Password"
                {...register('password2', {
                  required: true,
                })}
                style={{
                  border: `2px solid ${
                    errors.password1 || error.status ? 'red' : '#01C88C'
                  }`,
                }}
              />

              <div className="icon">
                <RiLockPasswordLine />
              </div>
            </FormGroup>

            {errors.password2 && (
              <ErrorContainer>
                <p>{recoveryPasswordErrors.password}</p>
              </ErrorContainer>
            )}

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                <button type="submit">
                  <h5>Confimar</h5>
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

              {error.status && error.type === 'incompatible' && (
                <ErrorContainer>
                  <p>{recoveryPasswordErrors.incompatible}</p>
                </ErrorContainer>
              )}

              {error.status && error.type === 'code' && (
                <ErrorContainer>
                  <p>{recoveryPasswordErrors.code}</p>
                </ErrorContainer>
              )}

              {error.status && error.type === 'token' && (
                <ErrorContainer>
                  <p>{recoveryPasswordErrors.token}</p>
                </ErrorContainer>
              )}

              {error.status && error.type === 'server' && (
                <ErrorContainer>
                  <p>{recoveryPasswordErrors.server}</p>
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
