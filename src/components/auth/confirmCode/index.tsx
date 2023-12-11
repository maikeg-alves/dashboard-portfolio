import React, { useRef, useState, ClipboardEvent } from 'react';
import { Col, Form } from 'react-bootstrap';
import { CodeDigitInput, VerificationCodeInput } from './styles';

import {
  SetCookie,
  baseUrl,
  closeAlertWithDelay,
  delayChangePage,
} from '@utils';
import { LoadingPage } from '@components';
import { statusMessages } from './exceptions';
import BodyLogin from '../BodyLogin';

interface Props {
  setPage: (page: number) => void;
}

export const ConfirmCodeComponent: React.FC<Props> = ({ setPage }) => {
  const [code, setCode] = useState(Array(6).fill(''));

  const codeInputs = Array(6).fill(useRef(null));
  const [activeButton, setActiveButton] = useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

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

    try {
      setLoader(true);

      const options = { method: 'GET' };

      const url = `${baseUrl}auth/recovery/confirm/${code.join('')}`;

      const response = await fetch(url, options);

      setElement(statusMessages[response.status]);
      closeAlertWithDelay(6000, setShowAlert);

      const json = await response.json();

      const optionsCookie = {
        path: '/',
        maxAge: 3600 * 24,
        sameSite: 'strict',
      };

      SetCookie('recoveryToken', json.recoveryToken, optionsCookie);

      if (response.ok) delayChangePage(3000, setPage, 4);
    } catch (error) {
      console.error('Erro ao processar requisição:', error);
      setShowAlert(true);
      setElement(statusMessages[500]);
    }
  };

  return (
    <>
      {!loader && (
        <BodyLogin>
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
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    ref={codeInputs[index + 5]}
                    onKeyDown={handleSelectAll}
                  />
                ))}
              </VerificationCodeInput>
            </Col>

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                <button type="submit" disabled={activeButton}>
                  <h5>Confirmar Código</h5>
                </button>
              </Col>
            </Col>
          </Form>
        </BodyLogin>
      )}
      {showAlert && Element}

      {loader && <LoadingPage />}
    </>
  );
};
