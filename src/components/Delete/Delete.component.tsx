import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { IProject } from '../../interfaces';
import { Container } from './styles';
import { _CRUD } from '../../scripts';

type Props = {
  id: number;
  projects: IProject[];
  handleDelete: (check: boolean) => void;
};

const Delete: React.FC<Props> = (props) => {
  const { name, github, id } = props.projects
    .filter((project) => project.id === props.id)
    .reduce((acc, item) => ({ ...acc, [item.id]: item }));

  const [check, setCheck] = React.useState<boolean>(true);

  const CRUD = new _CRUD(id, 'projects');

  const handlechage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.value === `${name}/${github}`) {
      console.log(e.currentTarget.value);
      setCheck(false);
    } else {
      setCheck(true);
    }
  };

  const handleDelete = () => {
    if (check === false) {
      CRUD.delete().then((res) => {
        if (res.revalidated) {
          alert('projeto atualizado com sucesso');
          props.handleDelete(check);
        }
      });
    }
  };

  return (
    <Container xs={12}>
      <Col>
        <h4>Você tem certeza absoluta?</h4>
        <p>
          Esta ação não pode ser desfeita. Isso excluirá permanentemente o<br />
          Projeto:{' '}
          <strong>
            {name}/{github}
          </strong>
        </p>
      </Col>

      <Col>
        <Form.Group>
          <Form.Label>
            Digite{' '}
            <strong>
              {name}/{github}
            </strong>{' '}
            para confirmar.
          </Form.Label>
          <Form.Control type="text" onChange={handlechage} />
          <Col xs={12}>
            <Button type="submit" disabled={check} onClick={handleDelete}>
              excluir projeto
            </Button>
          </Col>
        </Form.Group>
      </Col>
    </Container>
  );
};

export default Delete;
