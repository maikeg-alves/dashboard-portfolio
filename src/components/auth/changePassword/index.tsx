import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RiLockPasswordLine } from '@styles';
import { ErrorContainer, FormGroup } from '../login/styles';

import { useRouter } from 'next/router';

import { LoadingPage } from '@components';
import {
  GetCookie,
  baseUrl,
  closeAlertWithDelay,
  delayChangePage,
  recoveryPasswordErrors,
} from '@utils';
import { StatusCodes, statusMessages } from './exceptions';

interface Props {
  setPage: (page: number) => void;
}

interface Inputs {
  password1: string;
  password2: string;
}

export const ChangePasswordComponent: React.FC<Props> = ({ setPage }) => {
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

  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setLoader(true);

      const { password1, password2 } = formData;

      if (password1 !== password2) {
        setError({
          status: true,
          type: 'incompatible',
        });
        setLoader(false);

        closeAlertWithDelay(6000, setShowAlert);
        setElement(statusMessages[StatusCodes.BAD_REQUEST]);
        return;
      }

      const recoveryToken: string | null = GetCookie('recoveryToken');

      if (!recoveryToken) {
        closeAlertWithDelay(6000, setShowAlert);
        setElement(statusMessages[StatusCodes.UNAUTHORIZED]);
        delayChangePage(3000, setPage, 1);
      }

      const url = `${baseUrl}auth/recovery/reset-password`;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${recoveryToken}`,
        },
        body: JSON.stringify({
          newPassword: password1,
          newPasswordConfirm: password1,
        }),
      };

      const response = await fetch(url, options);

      if (response.status === 401) {
        closeAlertWithDelay(6000, setShowAlert);
        setElement(statusMessages[response.status]);
        delayChangePage(3000, setPage, 1);
      }

      setElement(statusMessages[response.status]);
      closeAlertWithDelay(3000, setShowAlert);
      delayChangePage(3000, setPage, 1);
    } catch (error) {
      setLoader(false);
      if (error instanceof Error) {
        console.error('Erro ao processar requisição:', error.message);
        setShowAlert(true);
        setElement(statusMessages[500]);
      } else {
        console.error('Erro desconhecido:', error);
      }
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
                  minLength: {
                    value: 8,
                    message:
                      'Your password must be at least 8 characters long.',
                  },
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

            {errors.password1?.type === 'minLength' && (
              <ErrorContainer>
                <p>{recoveryPasswordErrors.incompatibleSize}</p>
              </ErrorContainer>
            )}

            <FormGroup>
              <Form.Control
                type="password"
                placeholder="Confirmar Password"
                {...register('password2', {
                  required: true,
                  value: watch('password1'),
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
                  <a onClick={() => setPage(1)}>fazer login</a>
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
            </Col>
          </Form>
        </Col>
      )}
      {showAlert && Element}

      {loader && <LoadingPage />}
    </>
  );
};
