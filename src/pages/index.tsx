import React from 'react';
import type { NextPage } from 'next';
import { Col, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';

import {
  CardLogin,
  ErrorContainer,
  FormGroup,
} from '../styles/pages/login/styles';

import { Container } from '../layout';
import { MdOutlineEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';

const image = 'https://i.imgur.com/NIkBDgT.jpg';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ApiClient, verifyToken } from '@scripts';
import Countdown from 'react-countdown-now';
/* import { GrDriveCage } from 'react-icons/gr'; */

type Inputs = {
  email: string;
  password: string;
};

interface State {
  lockoutTime: number;
  attempts: number;
  disabled: boolean;
}

const errosMessage = {
  email: 'email vazio ou prenchido de forma incorreta ',
  password: 'senha vazia ou prenchido de forma incorreta',
  auth: 'email ou password incorreto',
  bruteforce:
    'muitas tentativas de acesso,  espere o time acabar e tente novamnte mais tarde',
};

const Login: NextPage = () => {
  const {
    register,
    handleSubmit,
    /* watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const [shouldRedirect, setShouldRedirect] = React.useState<boolean>(false);
  const [errorauth, setErrorAuth] = React.useState<boolean>(false);

  const [state, setState] = React.useState<State>({
    lockoutTime: 5,
    attempts: 0,
    disabled: false,
  });

  const CRUD = new ApiClient(Number(undefined), String(undefined));

  const checkLockoutTime = () => {
    const lockoutTime = localStorage.getItem('lockoutTime');

    if (lockoutTime && Date.now() < Number(lockoutTime)) {
      setState((prevState) => ({ ...prevState, disabled: true }));
    } else {
      setState((prevState) => ({ ...prevState, disabled: false }));
      localStorage.removeItem('lockoutTime');
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password } = data;

    const logindata = {
      email: email,
      password: password,
    };

    checkLockoutTime();

    const res = await CRUD.login(logindata);

    if (res) {
      if (res.code !== 200) {
        setErrorAuth(true);
        setState((prevState) => ({
          ...prevState,
          attempts: prevState.attempts + 1,
        }));
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
        }
      }

      if (state.attempts === 3) {
        setState((prevState) => ({ ...prevState, disabled: true }));

        localStorage.setItem(
          'lockoutTime',
          (Date.now() + state.lockoutTime * 60 * 1000).toString(),
        );

        setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            disabled: false,
            attempts: 0,
            lockoutTime: prevState.lockoutTime * 2,
          }));
        }, state.lockoutTime * 60 * 1000);
      }

      if (res.code === 200) {
        const token = res.response.token;
        localStorage.setItem('token', token);
        if (localStorage.getItem('token')) {
          setShouldRedirect(true);
        }
        return;
      }
    }
  };

  const handleVisitor = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    setShouldRedirect(true);
  };

  async function checkIfUserIsLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = await verifyToken(token);
      if (decodedToken) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  React.useEffect(() => {
    checkLockoutTime();

    if (shouldRedirect) {
      router.push('/dash');
    }

    const checkAuth = async () => {
      const isLoggedIn = await checkIfUserIsLoggedIn();
      if (isLoggedIn) {
        router.push('/dash');
      }
    };

    checkAuth();
  }, [shouldRedirect, router]);

  return (
    <Container background={image}>
      <CardLogin xs={12}>
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
                <p>{errosMessage.email}</p>
              </ErrorContainer>
            )}

            {errorauth && (
              <ErrorContainer>
                <p>{errosMessage.auth}</p>
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
                <p>{errosMessage.password}</p>
              </ErrorContainer>
            )}

            {errorauth && (
              <ErrorContainer>
                <p>{errosMessage.auth}</p>
              </ErrorContainer>
            )}

            {state.disabled && (
              <ErrorContainer>
                <p>{errosMessage.bruteforce}</p>
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
                  <a href="">forgot Password?</a>
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
      </CardLogin>
    </Container>
  );
};

export default Login;
