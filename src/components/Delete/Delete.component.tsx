import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { IProject } from '../../interfaces';

const Delete: React.FC<IProject[]> = (props) => {
  const { name, github } = props[0];

  console.log('delete', name, github);

  return (
    <Col xs={'auto'}>
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
          <Form.Control type="text" />
        </Form.Group>
      </Col>

      <Col xs={12}>
        <button>excluir projeto</button>
      </Col>
    </Col>
  );
};

export default Delete;