import React from 'react';

import { Col, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import Countdown from 'react-countdown-now';

import { RiLockPasswordLine, MdOutlineEmail } from '@styles';

import {
  baseUrl,
  SetCookie,
  closeAlertWithDelay,
  delayChangePage,
} from '@utils';

import { FormGroup } from './styles';

import { ErrorMessage, LoadingPage } from '@components';

import { IState, Inputs } from '@interfaces';
import { StatusCodes, statusMessages } from './exceptions';

interface Props {
  setPage: (page: number) => void;
}

export const LoginComponet: React.FC<Props> = ({ setPage }) => {
  const {
    register,
    handleSubmit,
    /* watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const [loader, setLoader] = React.useState<boolean>(false);

  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const [state, setState] = React.useState<IState>({
    lockoutTime: 5,
    attempts: +0,
    disabled: false,
    passaPortAcesse: Math.floor(Math.random() * 10000000000),
  });

  const invalidatedComposition = () => {
    if (
      localStorage.getItem('lockObject') ||
      localStorage.getItem('lockoutTime')
    ) {
      const objetoRecuperado = localStorage.getItem('lockObject');

      if (objetoRecuperado) {
        const objetoParseado = JSON.parse(objetoRecuperado) as IState;

        if (objetoParseado != state) {
          return true;
        }

        return false;
      }
    }

    return true;
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

      if (!response.ok && response.status != 401) {
        setElement(statusMessages[response.status]);
        closeAlertWithDelay(6000, setShowAlert);
        setLoader(false);
        return;
      }

      if (response.status === 401) {
        setElement(statusMessages[StatusCodes.UNAUTHORIZED]);
        closeAlertWithDelay(6000, setShowAlert);
        setLoader(false);

        setState((prevState) => ({
          ...prevState,
          attempts: prevState.attempts + 1,
        }));

        const affectedComposition = invalidatedComposition();

        if (affectedComposition) {
          setState((prevState) => ({
            ...prevState,
            lockoutTime: 100,
            disabled: true,
          }));

          router.push(
            'https://www.youtube.com/embed/VX0g9gu9co8?controls=0&rel=0&showinfo=0&autoplay=1',
          );
        } else if (state.attempts === 3) {
          setState((prevState) => ({ ...prevState, disabled: true }));
          localStorage.setItem(
            'lockoutTime',
            (Date.now() + state.lockoutTime * 60 * 1000).toString(),
          );
        }
      }

      setElement(statusMessages[StatusCodes.CREATED]);
      closeAlertWithDelay(6000, setShowAlert);

      const json = await response.json();

      SetCookie('userInfo', JSON.stringify(json), { expires: 1, path: '/' });

      delayChangePage(3000, setPage, 2);
    } catch (error) {
      setElement(statusMessages[StatusCodes.INTERNAL_SERVER_ERROR]);
      closeAlertWithDelay(6000, setShowAlert);
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
      const objectRecovered = localStorage.getItem('lockObject');

      if (objectRecovered) {
        const lockObject = JSON.parse(objectRecovered) as IState;

        if (JSON.stringify(lockObject) !== JSON.stringify(state)) {
          setState(lockObject);
        }
      } else {
        localStorage.setItem('lockObject', JSON.stringify(state));
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('lockObject', JSON.stringify(state));
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
                  required: {
                    value: true,
                    message: 'O campo é obrigatório',
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Formato de email inválido',
                  },
                })}
                style={{
                  border: `2px solid ${
                    errors.email || state.disabled ? 'red' : '#01C88C'
                  }`,
                }}
              />
              <div className="icon">
                <MdOutlineEmail />
              </div>
            </FormGroup>

            {errors.email && errors.email.message && (
              <ErrorMessage message={errors.email.message} />
            )}

            <FormGroup>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'O campo é obrigatório',
                  },
                })}
                style={{
                  border: `2px solid ${
                    errors.password || state.disabled ? 'red' : '#01C88C'
                  }`,
                }}
              />

              <div className="icon">
                <RiLockPasswordLine />
              </div>
            </FormGroup>

            {errors.password && errors.password.message && (
              <ErrorMessage message={errors.password.message} />
            )}

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                {state.disabled ? (
                  <div className="timer">
                    <Countdown
                      date={Number(localStorage.getItem('lockoutTime'))}
                      onComplete={() =>
                        setState((prevState) => ({
                          ...prevState,
                          attempts: 0,
                          disabled: false,
                          lockoutTime: prevState.lockoutTime * 2,
                        }))
                      }
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
                  <a onClick={() => setPage(2)}>forgot Password?</a>
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

      {showAlert && Element}

      {loader && <LoadingPage />}
    </>
  );
};
