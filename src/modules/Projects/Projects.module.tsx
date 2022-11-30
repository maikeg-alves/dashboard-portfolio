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
  GetView,
  Delete,
  PutItem,
} from '../../components';
import { IProject } from '../../interfaces';

type ProjectListProps = {
  projects: IProject[];
};

const Projects: React.FC<ProjectListProps> = (props) => {
  const { projects } = props;

  const { isShown, toggle } = useModal();

  const [pages, setPages] = React.useState<number>(0);
  const [projectsPage, setProjectsPage] = React.useState<Array<IProject>>([]);

  const handleNewProjects = () => {
    setPages(1);
    toggle();
  };

  const handleviewProjects = () => {
    setPages(2);
    toggle();
  };
  const handleeditProjects = (id: number) => {
    setPages(3);
    toggle();

    setProjectsPage(projects.filter((p) => p.id === id));
  };
  const handledeleteProjects = (id: number) => {
    setPages(4);
    toggle();
    setProjectsPage(projects.filter((p) => p.id === id));
  };

  React.useEffect(() => {
    if (isShown === false) {
      setPages(0);
    }
  }, [isShown]);

  return (
    <>
      <Project xs={12}>
        <Col xs={12} style={{ margin: '15px 0' }}>
          <Col>
            <h3>New project</h3>
          </Col>
          <Container>
            <Row>
              <Col xs={12} className="modalgrid">
                <button className="add-icon" onClick={handleNewProjects}>
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
                {projects &&
                  projects.map((project, index: number) => (
                    <>
                      <TableItems
                        id={index === 0 ? index + 1 : index}
                        name={project.name}
                        idproject={project.id}
                        created_at={project.created_at}
                        technologys={project.technologys}
                        handleDeleteProject={handledeleteProjects}
                        handleEditProject={handleeditProjects}
                      />
                    </>
                  ))}
              </tbody>
            </Table>
          </Col>
          {projects.length > 4 && (
            <>
              <Col xs={12} className="modalgrid">
                <button className="add-plus" onClick={handleviewProjects}>
                  <AiOutlinePlusCircle />
                </button>
              </Col>
            </>
          )}
        </Col>
      </Project>

      <Modal isShown={isShown} hide={toggle}>
        <>
          {pages === 1 && <FormProject />}
          {pages === 2 && <GetView />}
          {pages === 3 && <PutItem {...projectsPage} />}
          {pages === 4 && <Delete {...projectsPage} />}
        </>
      </Modal>
    </>
  );
};

export default Projects;
