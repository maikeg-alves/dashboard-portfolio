import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';

import { IProject, ITechnologys } from '../../interfaces';
import { Container } from './styles';
import { ApiClient } from '../../scripts';
import { LoadingBtn } from 'src/styles/components';

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
      return alert('acesso não autorizado');
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
            return alert(
              'token de acesso expirado, porfavor se logue novamente',
            );
          }

          if (res.revalidated) {
            alert(
              `${props.mode ? 'tecnologys' : 'projects'} excluido com sucesso`,
            );
            props.handleDelete(check);
          }

          console.log('values delete', res.code);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLooding(false);
      }
    }
  };

  return (
    <Container xs={12}>
      <Col>
        <h4>Você tem certeza absoluta?</h4>
        <p>
          Esta ação não pode ser desfeita. Isso excluirá permanentemente o<br />
          {props.mode ? 'Technologia' : 'Projeto'}: {''}
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
