import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { Provaider } from '@interfaces';
import { Container } from './styles';
import { LoadingPage } from '@components';
import { baseUrl, closeAlertWithDelay } from '@utils';
import { ApiManager } from '@hook';
import { statusMessages } from './exceptions';
import { StatusCodes } from '../auth/login/exceptions';

interface PropsDelete extends Provaider {
  mode: 'techs' | 'projects';
  hide: () => void;
}

const Delete: React.FC<PropsDelete> = (props) => {
  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const [apiManager] = React.useState(
    new ApiManager(
      `${baseUrl}${props.mode}/delete/${
        props.mode ? props.projects[0].id : props.techs[0].id
      }`,
    ),
  );

  const [check, setCheck] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [parameter, setParameter] = React.useState<string | null>(null);

  const handlechage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;

    if (value === parameter) {
      setCheck(true);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await apiManager.deleteData();

      if (!response.success && response.error) {
        setElement(statusMessages[response.error.statusCode]);
        closeAlertWithDelay(6000, setShowAlert);
        setLoader(false);
        return;
      }

      setElement(statusMessages[StatusCodes.CREATED]);
      closeAlertWithDelay(6000, setShowAlert);

      setTimeout(() => {
        props.hide();
      }, 3000);
    } catch (error) {
      console.error('Erro ao deletar Item:', error);
    }
  };

  React.useEffect(() => {
    if (props.mode === 'techs') {
      const tech = props.techs.find((item) => item);

      if (tech) {
        setParameter(`${tech.name}/id:${tech.id}`);
        setLoader(false);
      }
    }

    const project = props.projects.find((item) => item);

    if (project) {
      setParameter(`${project.name}/id:${project.id}`);
      setLoader(false);
    }
  }, [loader, props, parameter]);

  return (
    <>
      {loader ? (
        <LoadingPage />
      ) : (
        <Container xs={12}>
          <Col>
            <h4>Você tem certeza absoluta?</h4>
            <p>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente{' '}
              {props.mode === 'techs' ? 'a tecnologia' : 'o projeto'}:{' '}
              <strong>{parameter}</strong>
            </p>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>
                Digite <strong>{parameter}</strong> para confirmar.
              </Form.Label>
              <Form.Control type="text" onChange={handlechage} />
              <Col xs={12}>
                <Button disabled={!check} onClick={handleDelete}>
                  {props.mode === 'techs' ? 'EXCLUIR TECH ' : 'EXCLUIR PROJECT'}
                </Button>
              </Col>
            </Form.Group>
          </Col>
        </Container>
      )}

      {showAlert && Element}
    </>
  );
};

export default Delete;
