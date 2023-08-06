import React, { useRef, useState, ClipboardEvent } from 'react';
import { Col, Form } from 'react-bootstrap';
import { CodeDigitInput, VerificationCodeInput } from './styles';
import { useRouter } from 'next/router';

import { ErrorContainer } from '../styles';
import { GetCookie, SetCookie, baseUrl, codeFormErrors } from '@utils';
import { LoadingPage } from '@components';

interface Props {
  setPage: (page: number) => void;
}

export const ConfirmCodeComponent: React.FC<Props> = (props) => {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(''));
  const codeInputs = Array(6).fill(useRef(null));
  const [activeButton, setActiveButton] = useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [error, setError] = useState({
    status: false,
    type: '',
  });

  const [, setFilledInputs] = useState<number>(0);

  const handleSelectAll = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const targetInput = event.currentTarget;
    const isInputFullySelected =
      targetInput.selectionStart === 0 &&
      targetInput.selectionEnd === targetInput.value.length;

    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      event.preventDefault();
      targetInput.select();
    } else if (
      (event.key === 'Backspace' || event.key === 'Delete') &&
      isInputFullySelected
    ) {
      setActiveButton(false);
      event.preventDefault();
      setCode(Array(6).fill(''));
      codeInputs[0].current?.focus();
      setFilledInputs(0 - 1);
      setActiveButton(true);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      if (!isNaN(+value)) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (index < 5 && value !== '') {
          if (codeInputs[index + 1].current.value === '') {
            codeInputs[index + 1].current.focus();
          }
        }

        const newFilledInputs = newCode.filter((digit) => digit !== '').length;
        setFilledInputs(newFilledInputs);
        setActiveButton(newFilledInputs !== 6);

        if (newFilledInputs === 6) {
          setCode(newCode);
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

    const email = GetCookie('emailuser');

    if (typeof email !== 'string' || email === null) {
      setError({
        status: true,
        type: 'email',
      });
      console.error('Email inválido no cookies.');
      return;
    }

    const url = `${baseUrl}api/login/recovery/code?email=${email}&code=${code.join(
      '',
    )}`;

    const options = { method: 'GET' };

    try {
      setLoader(true);

      const response = await fetch(url, options);

      if (response.status === 404) {
        setLoader(false);
        setError({
          status: true,
          type: 'code',
        });

        setActiveButton(true);
        throw new Error(
          `Error during recovery code retrieval: status code ${response.status}`,
        );
      }

      if (response.status === 505) {
        setLoader(false);
        setError({
          status: true,
          type: 'server',
        });

        setActiveButton(true);
        throw new Error(
          `Error during recovery code retrieval: status code ${response.status}`,
        );
      }

      const json = await response.json();

      const optionsCookie = {
        path: '/',
        maxAge: 3600 * 24, // Expires after 1 day
        sameSite: 'strict', // 'strict', 'lax', ou 'none' (dependendo dos requisitos do seu projeto)
      };

      SetCookie('recoveryToken', json.recoveryToken, optionsCookie);
      SetCookie('code', json.code, options);

      if (response.ok) props.setPage(4);
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
        <>
          <Col xs="auto">
            <Col>
              <h4>Confirmação de Código</h4>
            </Col>
            <Col className="msg-secondary">
              <p>
                Por favor, informe o código que foi enviado para seu email de
                recuperação, e assim possamos recuperar a sua conta.
              </p>
            </Col>
          </Col>
          <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Col xs={12} className="my-4">
              <VerificationCodeInput onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <CodeDigitInput
                    key={index}
                    type="text"
                    error={error.status}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={codeInputs[index + 5]}
                    onKeyDown={handleSelectAll}
                  />
                ))}
              </VerificationCodeInput>
            </Col>

            {error.status && error.type === 'code' && (
              <ErrorContainer>
                <p>{codeFormErrors.code}</p>
              </ErrorContainer>
            )}

            {error.status && error.type === 'email' && (
              <ErrorContainer>
                <p>{codeFormErrors.email}</p>
              </ErrorContainer>
            )}

            {error.status && error.type === 'server' && (
              <ErrorContainer>
                <p>{codeFormErrors.server}</p>
              </ErrorContainer>
            )}

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                <button type="submit" disabled={activeButton}>
                  <h5>Confirmar Código</h5>
                </button>
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
        </>
      )}

      {loader && <LoadingPage />}
    </>
  );
};
