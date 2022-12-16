import React from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { IProject } from '../../interfaces';
import { Container } from './styles';
import { DeleteItem } from '../../scripts';

const Delete: React.FC<IProject[]> = (props) => {
  const { name, github, id } = props[0];

  const [check, setCheck] = React.useState<boolean>(true);

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
      DeleteItem('projects', id);
      alert(`projeto de id: ${id}, deletado com sucecsso! `);
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
