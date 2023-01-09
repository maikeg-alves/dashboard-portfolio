import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Col } from 'react-bootstrap';
import { IGithub, IProject, ITechnologys } from '../interfaces';
import { Container } from '../layout';
import { Panel, Dashbord, Projects, MobilePanel, UserArea } from '../modules';
import Technologys from 'src/modules/Technologys/technologys';
import { verifyToken } from 'src/scripts';

const URL_API = 'https://maicon-gabriel-alves.vercel.app/api';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
  admin: boolean;
};

const Home: NextPage<Props> = (props) => {
  const [update, setUpdate] = React.useState<boolean>(false);
  const [apiData, setApiData] = React.useState<Props>(props);
  const [pages, setPages] = React.useState<string>('Home');

  const handleOpen = (open: string) => {
    console.log('values click', open);
    setPages(open);
  };

  const handUpdate = () => {
    setUpdate(!update);
  };

  // trocando as paginas
  let pagesElement: React.ReactElement;

  switch (pages) {
    case 'Home':
      pagesElement = <Dashbord {...apiData} />;
      break;
    case 'Projects':
      pagesElement = <Projects updateValues={handUpdate} {...apiData} />;
      break;
    case 'Technologys':
      pagesElement = <Technologys updateValues={handUpdate} {...apiData} />;
      break;
    case 'Settings':
      pagesElement = <UserArea {...apiData} />;
      break;
    default:
      pagesElement = <p> dados não encontrado </p>;
  }

  /* utilizando da tecnica polling, atualizando os dados
   sempre que tem resquestes que altera o banco de dados */

  React.useEffect(() => {
    async function getData() {
      const data1 = await fetch(`${URL_API}/projects`);
      const data2 = await fetch(`${URL_API}/technologys`);
      const datagit = await fetch(
        'https://api.github.com/users/maikeg-alves/repos',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.GITHUB_TOKEN}`,
          },
        },
      );

      const dateProjects = await data1.json();
      const technologys = await data2.json();
      const github = await datagit.json();

      const projects = dateProjects.map((project: IProject) => {
        const validated = github.find(
          (github: IGithub) => github.name === project.github,
        );
        const { description, language, created_at } = validated;
        return {
          ...project,
          description,
          language,
          created_at,
        };
      });

      const token = localStorage.getItem('token')
        ? localStorage.getItem('token')
        : '';

      const admin = await verifyToken(token);

      setApiData({
        projects,
        technologys,
        github,
        values: false,
        admin: admin,
      });

      if (Object.keys(update).length > 0) {
        setUpdate(false);
      }
    }

    getData();
  }, [update]);

  return (
    <Container direction="column" align="center" justify="center" padding="3">
      <>
        <Panel setOpen={handleOpen} {...apiData} />
      </>
      <Col xs="auto" className="conElementes">
        {pagesElement}
      </Col>
      <>
        <MobilePanel setOpen={handleOpen} />
      </>
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data1 = await fetch(`${URL_API}/projects`);
    const data2 = await fetch(`${URL_API}/technologys`);
    const datagit = await fetch(
      'https://api.github.com/users/maikeg-alves/repos',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    const dateProjects = await data1.json();
    const technologys = await data2.json();
    const github = await datagit.json();

    const projects: IProject[] = dateProjects.map((project: IProject) => {
      const validated = github.find(
        (github: IGithub) => github.name === project.github,
      );
      const { description, language, created_at } = validated;
      return {
        ...project,
        description,
        language,
        created_at,
      };
    });

    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';

    const admin = await verifyToken(token);

    return {
      props: {
        projects,
        technologys,
        github,
        values: false,
        admin: admin,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        projects: [],
        technologys: [],
        github: [],
        values: false,
        admin: false,
      },
    };
  }
};
