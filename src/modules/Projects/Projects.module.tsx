import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { Project } from './styles';

import { AiFillPlusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  TableItems,
  Table,
  Modal,
  useModal,
  FormProject,
} from '../../components';

const Projects: React.FC = () => {
  const { isShown, toggle } = useModal();

  return (
    <>
      <Project xs={12}>
        <Col xs={12}>
          <Col>
            <h3>New project</h3>
          </Col>
          <Container>
            <Row>
              <Col xs={12} className="modalgrid">
                <button className="add-icon" onClick={toggle}>
                  <AiFillPlusCircle />
                  <p>add new project</p>
                </button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12}>
          <Col>
            <h3>Existing projects</h3>
          </Col>
          <Col xs={12}>
            <Table>
              <tbody>
                <TableItems />
                <TableItems />
                <TableItems />
                <TableItems />
              </tbody>
            </Table>
          </Col>
          <Col xs={12} className="modalgrid">
            <button className="add-plus" onClick={toggle}>
              <AiOutlinePlusCircle />
            </button>
          </Col>
        </Col>
      </Project>

      <Modal isShown={isShown} hide={toggle} headerText="cabeça">
        <>
          <FormProject />
        </>
      </Modal>
    </>
  );
};

export default Projects;
