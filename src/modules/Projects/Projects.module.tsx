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
} from '../../components';
import { IGithub, IProject, ITechnologys } from '../../interfaces';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
  admin: boolean;
  updateValues?: (values: boolean) => void;
};

const Projects: React.FC<Props> = (props) => {
  const { projects } = props;

  const { isShown, toggle } = useModal();

  const [pages, setPages] = React.useState<number>(0);

  const [putprojectsPage, setPutprojectsPage] = React.useState<Props>(
    [] as unknown as Props,
  );

  const [id, setID] = React.useState<number>(0);

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
    if (props) {
      const data = props.projects.filter((project) => project.id === id);

      const { technologys, github } = props;

      setPutprojectsPage({
        projects: data,
        technologys,
        github,
        values: true,
        admin: props.admin,
      });
    }

    toggle();
  };

  // setando o id que será usado

  const handledeleteProjects = (id: number) => {
    setPages(4);
    setID(id);
    toggle();
  };

  // solicitando updates nos dados após mudanças na base de dasdos

  const statusUpdate = (e: boolean) => {
    if (props.updateValues !== undefined) {
      props.updateValues(e ? false : true);
      toggle();
    }
  };

  // renderizando a pagina de acordo com oq o usuario seleciona

  let pagesElement: React.ReactElement;

  switch (pages) {
    case 1:
      pagesElement = <FormProject statusUpdate={statusUpdate} {...props} />;
      break;
    case 2:
      pagesElement = <GetView statusUpdate={statusUpdate} {...props} />;
      break;
    case 3:
      pagesElement = (
        <FormProject statusUpdate={statusUpdate} {...putprojectsPage} />
      );
      break;
    case 4:
      pagesElement = <Delete handleDelete={statusUpdate} id={id} {...props} />;
      break;
    default:
      pagesElement = <div>valores não carregados</div>;
  }

  React.useEffect(() => {
    if (isShown === false) {
      setPages(0);
    }
  }, [isShown]);

  return (
    <>
      <Project xs={12}>
        <Col>
          <h3>New project: </h3>
        </Col>
        <Container>
          <Row className="my-3">
            <Col className="modalgrid">
              <button className="add-icon" onClick={handleNewProjects}>
                <AiFillPlusCircle />
                <p>add new project</p>
              </button>
            </Col>
          </Row>

          <Col xs={12}>
            <div>
              <h3>Existing projects</h3>
            </div>
            <Row className="flex-responsive" style={{ height: 'auto' }}>
              <Table>
                <tbody>
                  {projects &&
                    projects
                      .sort(
                        (a, b) =>
                          Date.parse(a.created_at) - Date.parse(b.created_at),
                      )
                      .slice(0, 4)
                      .map((project, id: number) => (
                        <>
                          <TableItems
                            id={id + 1}
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
            </Row>
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
        </Container>
      </Project>

      <Modal isShown={isShown} hide={toggle}>
        <>{pagesElement}</>
      </Modal>
    </>
  );
};

export default Projects;
