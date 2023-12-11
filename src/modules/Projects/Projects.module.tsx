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
  GetView,
  Delete,
  ProjectManagementForm,
  LoadingPage,
} from '@components';

import { IProject, Provaider } from '../../interfaces';
import { sortByCreatedAt } from '@utils';

interface PropsMain extends Provaider {
  selectedComponent: number;
  mode: 'techs' | 'projects';
  update?: boolean;
  id?: number | null;
  hide: () => void; // Adicione esta linha
}

enum SetComponet {
  GET = 1,
  CREATE = 2,
  UPDATE = 3,
  DELETE = 4,
}

interface SelecteComponet {
  [key: number]: JSX.Element;
}

const Projects: React.FC<Provaider> = (props) => {
  const { isShown, toggle } = useModal();

  const [appData, setAppData] = React.useState<PropsMain>({
    ...props,
    selectedComponent: SetComponet.CREATE,
    mode: 'projects',
    update: false,
    id: null,
    hide: toggle, // Adicione esta linha
  });

  const handleviewProjects = () => {
    setAppData({
      ...appData,
      projects: props.projects,
      selectedComponent: SetComponet.GET,
    });
    !isShown && toggle();
  };

  const handleCreate = () => {
    setAppData({
      ...appData,
      update: false,
      selectedComponent: SetComponet.CREATE,
    });
    !isShown && toggle();
  };

  const handleUpdate = (id: number) => {
    const selectedProject = props.projects.find((p) => p.id === id);

    if (selectedProject) {
      setAppData({
        ...appData,
        update: true,
        projects: [selectedProject] || [],
        selectedComponent: SetComponet.UPDATE,
      });
    }
    !isShown && toggle();
  };

  const handleDelete = (id: number) => {
    const selectedProject = props.projects.find((p) => p.id === id);

    if (selectedProject) {
      setAppData({
        ...appData,
        projects: [selectedProject] || [],
        selectedComponent: SetComponet.DELETE,
      });
    }

    !isShown && toggle();
  };

  const [projects, setProjects] = React.useState<IProject[]>([]);

  React.useEffect(() => {
    setProjects(props.projects || []);
    setAppData({
      ...props,
      ...appData,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.projects, props]);

  const currentComponent: SelecteComponet = {
    [SetComponet.GET]: (
      <GetView {...appData} SetDelete={handleDelete} SetUpdate={handleUpdate} />
    ),
    [SetComponet.DELETE]: <Delete {...appData} />,
    [SetComponet.CREATE]: <ProjectManagementForm {...appData} />,
    [SetComponet.UPDATE]: <ProjectManagementForm {...appData} />,
  };

  return !projects.length ? (
    <LoadingPage />
  ) : (
    <>
      <Project xs={12}>
        <Col xs={12} style={{ margin: '15px 0' }}>
          <Col>
            <h3>New project: </h3>
          </Col>
          <Container>
            <Row className="my-3">
              <Col className="modalgrid">
                <button className="add-icon" onClick={handleCreate}>
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
            <Table techs>
              {projects
                .sort(sortByCreatedAt)
                .slice(0, 4)
                .map((project) => (
                  <>
                    <TableItems
                      {...project}
                      handleDeleteProject={handleDelete}
                      handleEditProject={handleUpdate}
                    />
                  </>
                ))}
            </Table>
          </Col>

          <Col xs={12} className="modalgrid">
            <button className="add-plus w-100" onClick={handleviewProjects}>
              <AiOutlinePlusCircle />
            </button>
          </Col>
        </Col>
      </Project>

      <Modal isShown={isShown} hide={toggle}>
        {currentComponent[appData.selectedComponent]}
      </Modal>
    </>
  );
};

export default Projects;
