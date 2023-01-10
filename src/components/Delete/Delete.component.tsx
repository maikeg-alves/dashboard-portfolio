import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { IProject, ITechnologys } from '../../interfaces';
import { Container } from './styles';
import { ApiClient } from '../../scripts';
import { LoadingBtn } from 'src/styles/components';
import ErrorMessage from '../ErrorMessage/ErrorMessage.component';

type Props = {
  id: number;
  projects: IProject[];
  technologys: ITechnologys[];
  mode?: boolean;
  admin: boolean;
  handleDelete: (check: boolean) => void;
};

const Delete: React.FC<Props> = (props) => {
  const [check, setCheck] = React.useState<boolean>(true);
  const [looding, setLooding] = React.useState<boolean>(false);
  const [alertmensage, setAlertMensage] = React.useState<string>('');

  let mensage: React.ReactElement;

  const CRUD = new ApiClient(
    props.id,
    `${props.mode ? 'technologys' : 'projects'}`,
  );

  const handlechage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    if (props.mode) {
      const { name, id } = props.technologys
        .filter((item) => item.id === props.id)
        .reduce((acc, item) => ({ ...acc, [item.id]: item }));
      if (value === `${name}/id:${id}`) {
        setCheck(false);
      } else {
        setCheck(true);
      }
    } else {
      const { name, github } = props.projects
        .filter((item) => item.id === props.id)
        .reduce((acc, item) => ({ ...acc, [item.id]: item }));
      if (value === `${name}/${github}`) {
        setCheck(false);
      } else {
        setCheck(true);
      }
    }
  };

  const handleDelete = async () => {
    if (!props.admin) {
      setCheck(true);
      return setAlertMensage('accessError');
    }

    if (check === false) {
      setLooding(true);
      try {
        const token = await localStorage.getItem('token');
        if (token !== null) {
          const res = await CRUD.delete(token);

          if (res.code !== 200) {
            props.handleDelete(check);
            setLooding(false);
            return setAlertMensage('revokedAccess');
          }

          if (res.revalidated) {
            setAlertMensage('successDelete');
            props.handleDelete(check);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLooding(false);
      }
    }
  };

  switch (alertmensage) {
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
            props.mode ? 'Tecnologys' : 'Projects'
          } excluido com sucesso`}
          alert="success"
        />
      );
      break;
    /*     case 'errorDelete':
      mensage = <ErrorMessage message="error ao criar projeto" />;
      break; */
    default:
      mensage = <p></p>;
      break;
  }

  React.useEffect(() => {
    setTimeout(() => {
      setAlertMensage('');
    }, 3000);
  }, [alertmensage]);

  return (
    <Container xs={12}>
      <Col>{mensage}</Col>
      <Col>
        <h4>Você tem certeza absoluta?</h4>
        <p>
          Esta ação não pode ser desfeita. Isso excluirá permanentemente <br />
          {props.mode ? 'a Technologia' : 'o Projeto'}: {''}
          <strong>
            {props.mode
              ? props.technologys
                  .filter((tech) => tech.id === props.id)
                  .map((res) => `${res.name + '/id:' + res.id}`)
              : props.projects
                  .filter((projct) => projct.id === props.id)
                  .map((res) => `${res.name + '/' + res.github}`)}
          </strong>
        </p>
      </Col>

      <Col>
        <Form.Group>
          <Form.Label>
            Digite{' '}
            <strong>
              {props.mode
                ? props.technologys
                    .filter((tech) => tech.id === props.id)
                    .map((res) => `${res.name + '/id:' + res.id}`)
                : props.projects
                    .filter((projct) => projct.id === props.id)
                    .map((res) => `${res.name + '/' + res.github}`)}
            </strong>{' '}
            para confirmar.
          </Form.Label>
          <Form.Control type="text" onChange={handlechage} />
          <Col xs={12}>
            <Button disabled={check} onClick={handleDelete}>
              {looding ? (
                <LoadingBtn />
              ) : props.mode ? (
                'Excluir Tecnologia'
              ) : (
                'Excluir Projeto'
              )}
            </Button>
          </Col>
        </Form.Group>
      </Col>
    </Container>
  );
};

export default Delete;
