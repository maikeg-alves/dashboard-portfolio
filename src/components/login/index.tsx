import React from 'react';

import { Col, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Countdown from 'react-countdown-now';

import { RiLockPasswordLine, MdOutlineEmail } from '@styles';

import { saveToken, loginFormErrors, baseUrl } from '@utils';

import { ErrorContainer, FormGroup } from './styles';

import { LoadingPage } from '@components';

import { IState, Inputs } from '@interfaces';

interface Props {
  setPage: (page: number) => void;
}

export const LoginComponet: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    /* watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const [errorauth, setErrorAuth] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [state, setState] = React.useState<IState>({
    lockoutTime: 5,
    attempts: 0,
    disabled: false,
    passaPortAcesse: Math.floor(Math.random() * 10000000000),
  });

  const invalidatedComposition = () => {
    if (localStorage.getItem('lockObject')) {
      const objetoRecuperado = localStorage.getItem('lockObject');
      if (objetoRecuperado) {
        const objetoParseado = JSON.parse(objetoRecuperado) as IState;

        if (objetoParseado.passaPortAcesse != state.passaPortAcesse) {
          return true;
        }
        return false;
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const { email, password } = formData;

      setLoader(true);

      const url = `${baseUrl}auth/login`;

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(url, options);

      if (response.status === 401) {
        console.log(state);
        setLoader(false);
        setErrorAuth(true);

        setState((prevState) => ({
          ...prevState,
          attempts: prevState.attempts + 1,
        }));

        const inv = invalidatedComposition();

        console.log(inv);

        if (state.attempts === 3) {
          setState((prevState) => ({ ...prevState, disabled: true }));
          const objetoRecuperado = localStorage.getItem('lockObject');

          localStorage.setItem(
            'lockoutTime',
            (Date.now() + state.lockoutTime * 60 * 1000).toString(),
          );

          if (objetoRecuperado) {
            const objetoParseado = JSON.parse(objetoRecuperado) as IState;

            if (objetoParseado.disabled) {
              setTimeout(() => {
                setState((prevState) => ({
                  ...prevState,
                  disabled: false,
                  attempts: 0,
                  lockoutTime: prevState.lockoutTime * 2,
                }));
              }, state.lockoutTime * 60 * 1000);

              console.log('fechou no stateps', state);
            }
          }
        }
      }

      /* const json = await response.json();

      const token = json.token; */
      /* 
      const isTokenSaved = await saveToken(token); */
      /* 
      if (isTokenSaved || response.ok) {
        router.push('/dash');
      } */
    } catch (error) {
      setErrorAuth(true);
      setLoader(false);
      if (error instanceof Error) {
        console.error('Erro ao processar requisição:', error.message);
      } else {
        throw new Error('Error ao tentar eestabelecer conexão com o servidor');
      }
    }
  };

  const handleVisitor = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    router.push('/dash');
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lockObject', JSON.stringify(state));
    }
  }, [state]);

  return (
    <>
      {!loader && (
        <Col className="d-flex flex-column align-items-center" xs="auto">
          <Form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
            <Col xs="auto">
              <Col>
                <h4>Login</h4>
              </Col>
              <Col className="msg-secondary">
                <p>Please, fill in your details to enter</p>
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
                    errors.email || errorauth || state.disabled
                      ? 'red'
                      : '#01C88C'
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

            {errorauth && (
              <ErrorContainer>
                <p>{loginFormErrors.auth}</p>
              </ErrorContainer>
            )}

            <FormGroup>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: true,
                })}
                style={{
                  border: `2px solid ${
                    errors.password || errorauth || state.disabled
                      ? 'red'
                      : '#01C88C'
                  }`,
                }}
              />

              <div className="icon">
                <RiLockPasswordLine />
              </div>
            </FormGroup>
            {errors.password && (
              <ErrorContainer>
                <p>{loginFormErrors.password}</p>
              </ErrorContainer>
            )}

            {errorauth && (
              <ErrorContainer>
                <p>{loginFormErrors.auth}</p>
              </ErrorContainer>
            )}

            {state.disabled && (
              <ErrorContainer>
                <p>{loginFormErrors.bruteforce}</p>
              </ErrorContainer>
            )}

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                {state.disabled ? (
                  <div className="timer">
                    <Countdown
                      date={Number(localStorage.getItem('lockoutTime'))}
                      renderer={(props) => (
                        <h5>
                          {props.minutes}:
                          {props.seconds < 10
                            ? '0' + props.seconds
                            : props.seconds}
                        </h5>
                      )}
                    />
                  </div>
                ) : (
                  <button type="submit" disabled={state.disabled}>
                    <h5>LOGIN</h5>
                  </button>
                )}

                <Col className="forgot">
                  <a onClick={() => props.setPage(2)}>forgot Password?</a>
                </Col>
              </Col>
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
          </Form>
        </Col>
      )}

      {loader && <LoadingPage />}
    </>
  );
};
