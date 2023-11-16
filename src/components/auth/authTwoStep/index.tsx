import React, { useRef, useState, ClipboardEvent } from 'react';
import { Col, Form } from 'react-bootstrap';
import { CodeDigitInput, VerificationCodeInput } from './styles';
import { useRouter } from 'next/router';

import { GetCookie, SetCookie, baseUrl, closeAlertWithDelay } from '@utils';
import { LoadingPage } from '@components';
import { StatusCodes, statusMessages } from './exceptions';
import { IloginRes } from '@interfaces';

export const AuthTwoStep: React.FC = () => {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(''));

  const [inputRefs] = useState<Array<React.RefObject<HTMLInputElement>>>(
    Array(6)
      .fill(null)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      .map(() => useRef<HTMLInputElement | null>(null)),
  );

  const [activeButton, setActiveButton] = useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const [, setFilledInputs] = useState<number>(0);

  const handleDeleteInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const lastDigitIndex = code
        .slice()
        .reverse()
        .findIndex((digit) => digit !== '' && digit !== undefined);

      if (lastDigitIndex !== -1) {
        const originalIndex = code.length - 1 - lastDigitIndex;

        const newCode = [...code];
        newCode[originalIndex] = '';

        if (originalIndex > 0 && inputRefs[originalIndex - 1]) {
          const previousInput = inputRefs[originalIndex - 1].current;
          if (previousInput) {
            previousInput.focus();
          }
        }

        setCode(newCode);
      }
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value != '' && !isNaN(+value)) {
      const codes = [...code];
      codes[index] = value;

      setCode(codes);

      if (inputRefs[index + 1]?.current !== undefined) {
        if (inputRefs[index + 1].current?.value === '') {
          inputRefs[index + 1].current?.focus();
        }
      }
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text');
    const pastedCode = pastedData.replace(/\D/g, '').slice(0, 6).split('');

    const newCode = Array(6).fill('');

    pastedCode.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });

    const newFilledInputs = pastedCode.length;
    setFilledInputs(newFilledInputs);
    setActiveButton(newFilledInputs !== 6);

    setCode(newCode);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoader(true);

      const cookieUser = GetCookie('userInfo');

      const user = JSON.parse(cookieUser ? cookieUser : '') as IloginRes;

      const token = code.join('');

      const url = `${baseUrl}auth/otp/validate`;

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          token,
        }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        setElement(statusMessages[response.status]);
        closeAlertWithDelay(6000, setShowAlert);
        setLoader(false);
        setActiveButton(true);
        return;
      }

      setElement(statusMessages[StatusCodes.OK]);
      closeAlertWithDelay(6000, setShowAlert);

      const json = (await response.json()) as { token: string };

      const optionsCookie = {
        path: '/',
        maxAge: 3600 * 24,
        sameSite: 'strict',
      };

      SetCookie('accesstoken', json.token, optionsCookie);

      if (GetCookie('accesstoken')) {
        if (response.ok) router.push('/dash');
      }
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
    const allInputsFilled = code.every((digit) => digit !== '');

    setActiveButton(!allInputsFilled);
  }, [code]);

  return (
    <>
      {!loader && (
        <>
          <Col xs="auto">
            <Col>
              <h4>Autenticação por 2FA</h4>
            </Col>
            <Col className="msg-secondary">
              <p>
                Por favor, informe o código gerado pelo seu app de authenticator
                para garantir a segurança da sua conta através da autenticação
                de dois fatores.
              </p>
            </Col>
          </Col>
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Col xs={12} className="my-4">
              <VerificationCodeInput onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <CodeDigitInput
                    id={`#${index}`}
                    key={index}
                    type="text"
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={inputRefs[index]}
                    onKeyDown={handleDeleteInput}
                    error={activeButton && showAlert}
                  />
                ))}
              </VerificationCodeInput>
            </Col>

            <Col xs="auto" className="d-flex flex-column align-items-center ">
              <Col
                xs="auto"
                className="d-flex flex-column align-items-center w-100"
              >
                <button
                  type="submit"
                  disabled={activeButton}
                  className="w-100"
                  style={{ fontSize: '1rem' }}
                >
                  Confirmar Token
                </button>
              </Col>

              <Col className="msg-secondary visit">
                <p>
                  Não é o administrador? Entre como
                  <a onClick={handleVisitor} style={{ cursor: 'pointer' }}>
                    {' '}
                    Visitante
                  </a>
                </p>
              </Col>
            </Col>
          </Form>
        </>
      )}
      {showAlert && Element}

      {loader && <LoadingPage />}
    </>
  );
};
