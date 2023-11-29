import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { Provaider } from '@interfaces';
import { Container } from './styles';
import { LoadingPage } from '@components';

interface PropsDelete extends Provaider {
  mode: 'tech' | 'project';
}

const Delete: React.FC<PropsDelete> = (props) => {
  const [check, setCheck] = React.useState<boolean>(true);
  const [loader, setLoader] = React.useState<boolean>(true);

  const [parameter, setParameter] = React.useState<string | null>(null);

  /* let mensage: React.ReactElement; */

  /*   const CRUD = new ApiClient(
    props.id,
    `${props.mode ? 'technologys' : 'projects'}`,
  ); */

  const handlechage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;

    console.log(value === parameter);

    if (value === parameter) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  /* TODO: trocar pelo hook de delete */

  const handleDelete = async () => {
    /*  const token = await localStorage.getItem('token');

    if (!props.admin) {
      return setAlertMensage('accessError');
    }

    verifyToken(token).then(() => {
      if (!token) {
        return setAlertMensage('revokedAccess');
      }
    });

    setLooding(true);
    try {
      if (token) {
        const res = await CRUD.delete(token);
        if (res.code !== 200) {
          setAlertMensage('errorDelete');
          setTimeout(() => {
            props.handleDelete(true);
          }, 3000);
        }

        if (res.revalidated) {
          setAlertMensage('successDelete');
          setTimeout(() => {
            props.handleDelete(true);
          }, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    } */
  };

  /*  TODO: trocar pela estrtura de exceptions */

  /*  switch (alertmensage) {
    case 'accessError':
      mensage = <ErrorMessage message="Acesso não autorizado" />;
      break;
    case 'revokedAccess':
      mensage = (
        <ErrorMessage
          message="Token de acesso expirado, porfavor se logue novamente"
          alert="warning"
        />
      );
      break;
    case 'successDelete':
      mensage = (
        <ErrorMessage
          message={`${
            props.mode ? 'Technologia' : 'Projeto'
          } excluido com sucesso`}
          alert="success"
        />
      );
      break;
    case 'errorDelete':
      mensage = (
        <ErrorMessage
          message={`error ao deletar ${props.mode ? 'technologia' : 'projeto'}`}
        />
      );
      break;
    default:
      mensage = <p></p>;
      break;
  } */

  React.useEffect(() => {
    if (props.mode === 'tech') {
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
      <Container xs={12}>
        {loader ? (
          <LoadingPage />
        ) : (
          <>
            <Col>
              <h4>Você tem certeza absoluta?</h4>
              <p>
                Esta ação não pode ser desfeita. Isso excluirá permanentemente{' '}
                {props.mode === 'tech' ? 'a tecnologia' : 'o projeto'}:{' '}
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
                  <Button disabled={check} onClick={handleDelete}>
                    {props.mode === 'tech'
                      ? 'EXCLUIR TECH '
                      : 'EXCLUIR PROJECT'}
                  </Button>
                </Col>
              </Form.Group>
            </Col>
          </>
        )}
      </Container>
    </>
  );
};

export default Delete;
