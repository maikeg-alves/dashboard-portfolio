import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdOutlineEmail } from '@styles';
import { FormGroup } from '../login/styles';
import { baseUrl, closeAlertWithDelay, delayChangePage } from '@utils';
import { ErrorMessage, LoadingPage } from '@components';
import { statusMessages } from './exceptions';
import BodyLogin from '../BodyLogin';
interface Props {
  setPage: (page: number) => void;
}

interface Inputs {
  email: string;
}

export const RecoveryComponent: React.FC<Props> = ({ setPage }) => {
  const {
    register,
    handleSubmit,
    /* watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const [loader, setLoader] = React.useState<boolean>(false);
  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      setLoader(true);

      const url = `${baseUrl}auth/recovery`;

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        setElement(statusMessages[response.status]);
        closeAlertWithDelay(6000, setShowAlert);
        setLoader(false);
        return;
      }

      setElement(statusMessages[response.status]);
      closeAlertWithDelay(6000, setShowAlert);

      if (response.ok) delayChangePage(3000, setPage, 3);
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
                  border: `2px solid ${errors.email && 'red'}`,
                }}
              />
              <div className="icon">
                <MdOutlineEmail />
              </div>
            </FormGroup>

            {errors.email && errors.email.message && (
              <ErrorMessage message={errors.email.message} />
            )}

            <Col xs="auto" className="d-flex flex-column align-items-center">
              <Col xs="auto" className="d-flex flex-column align-items-center">
                <button type="submit">
                  <h5>Enviar Código</h5>
                </button>
                <Col className="forgot">
                  <a onClick={() => setPage(1)}>fazer login</a>
                </Col>
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
