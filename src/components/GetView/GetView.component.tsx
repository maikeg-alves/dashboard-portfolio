import * as React from 'react';
import { IGithub, IProject, ITechnologys } from '@interfaces';
import { Col } from 'react-bootstrap';
import {
  Delete,
  FormProject,
  Table,
  TableItems,
  FormTechnology,
} from '../../components';
import { Container } from './styles';
import { BsChevronDown } from 'react-icons/bs';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
  mode?: boolean;
  admin: boolean;
  statusUpdate?: (status: boolean) => void;
};

const GetView: React.FC<Props> = (props) => {
  const { projects, technologys } = props;

  const [id, setId] = React.useState<number>(0);
  const [pages, setPages] = React.useState<number>(0);

  const [data, setData] = React.useState<Props>([] as unknown as Props);

  const handledeleteProjects = (e: number) => {
    setPages(1);
    console.log('delete ', e);
    setId(e);
  };
  const handleeditProjects = (id: number) => {
    setPages(2);
    setId(id);
    const { projects, technologys, github } = props;

    const data = projects?.filter((project) => project.id === id);

    const allData: Props = {
      projects: data,
      technologys,
      github,
      values: true,
      admin: props.admin,
    };
    setData(allData);
  };

  const Update = (e: boolean) => {
    console.log('update ', e);
    if (props.statusUpdate !== undefined) {
      props.statusUpdate(e);
    }
  };

  const exitpage = () => {
    setPages(0);
  };

  console.log('getview values', props);

  let Elemente: React.ReactElement;

  switch (pages) {
    case 0:
      Elemente = (
        <Table>
          {props.mode
            ? technologys
                .sort((a, b) => b.ability - a.ability)
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
                ))
            : projects
                .sort(
                  (a, b) => Date.parse(a.created_at) - Date.parse(b.created_at),
                )
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
        </Table>
      );
      break;

    case 1:
      Elemente = <Delete handleDelete={Update} id={id} {...props} />;
      break;

    case 2:
      if (props.mode) {
        Elemente = <FormTechnology statusUpdate={Update} id={id} {...data} />;
      } else {
        Elemente = <FormProject statusUpdate={Update} {...data} />;
      }
      break;

    default:
      Elemente = <p>error page</p>;
  }

  return (
    <Container xs={12}>
      <Col xs={12} className="exit">
        <span onClick={exitpage}>
          <BsChevronDown />
        </span>
      </Col>
      <>{Elemente}</>
    </Container>
  );
};

export default GetView;
