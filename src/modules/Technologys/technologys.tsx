import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';

import { Technology } from './styles';

import { AiFillPlusCircle } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  TableItems,
  Table,
  Modal,
  useModal,
  GetView,
  Delete,
  FormTechnology,
  /*   PutItem, */
} from '../../components';
import { IGithub, IProject, ITechnologys } from '../../interfaces';
import { useMediaQuery } from 'src/scripts';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
  admin: boolean;
  updateValues?: (values: boolean) => void;
};

const Technologys: React.FC<Props> = (props) => {
  const { technologys } = props;

  const { isShown, toggle } = useModal();

  const [pages, setPages] = React.useState<number>(7);

  const [putprojectsPage, setPutprojectsPage] = React.useState<Props>(
    [] as unknown as Props,
  );

  const [id, setID] = React.useState<number>(0);

  /* const [amount, setAmount] = React.useState<number>(0); */

  const handleNewProjects = () => {
    setPages(1);
    toggle();
  };

  const handleviewProjects = () => {
    setPages(2);
    toggle();
  };

  const handleeditProjects = (id: number) => {
    setID(id);
    setPages(3);
    if (props) {
      /*     const data = props.projects.filter((project) => project.id === id);

      const { technologys, github } = props; */

      const alldata: Props = {
        ...props,
        values: true,
      };

      setPutprojectsPage(alldata);
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
      pagesElement = (
        <FormTechnology stateCreate={statusUpdate} id={id} {...props} />
      );
      break;
    case 2:
      pagesElement = <GetView mode statusUpdate={statusUpdate} {...props} />;
      break;
    case 3:
      pagesElement = (
        <FormTechnology
          statusUpdate={statusUpdate}
          id={id}
          {...putprojectsPage}
        />
      );
      break;
    case 4:
      pagesElement = (
        <Delete mode handleDelete={statusUpdate} id={id} {...props} />
      );
      break;
    default:
      pagesElement = <div>valores não carregados</div>;
  }

  React.useEffect(() => {
    if (isShown === false) {
      setPages(0);
    }
  }, [isShown]);

  const mediaQueryWidth = useMediaQuery(950);

  return (
    <>
      <Technology xs={12}>
        <Col xs={12} style={{ margin: '15px 0' }}>
          <Col>
            <h3>New Technology: </h3>
          </Col>
          <Container>
            <Row>
              <Col xs={12} className="modalgrid">
                <button className="add-icon" onClick={handleNewProjects}>
                  <AiFillPlusCircle />
                  <p>add new Technologys</p>
                </button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col xs={12}>
          <Col>
            <h3>Existing Technologys</h3>
          </Col>
          <Col xs={12}>
            <Table>
              <tbody>
                {technologys &&
                  technologys
                    .slice(0, mediaQueryWidth ? 3 : 7)
                    .map((tech, id: number) => (
                      <>
                        <TableItems
                          id={id + 1}
                          name={tech.name}
                          idproject={tech.id}
                          ability={tech.ability}
                          handleDeleteProject={handledeleteProjects}
                          handleEditProject={handleeditProjects}
                        />
                      </>
                    ))}
              </tbody>
            </Table>
          </Col>
          {technologys.length > 4 && (
            <>
              <Col xs={12} className="modalgrid">
                <button className="add-plus" onClick={handleviewProjects}>
                  <AiOutlinePlusCircle />
                </button>
              </Col>
            </>
          )}
        </Col>
      </Technology>

      <Modal isShown={isShown} hide={toggle}>
        <>{pagesElement}</>
      </Modal>
    </>
  );
};

export default Technologys;
