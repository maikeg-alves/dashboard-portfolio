import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { Col } from 'react-bootstrap';
import { IGithub, IProject, ITechnologys } from '../interfaces';
import { Container } from '../layout';
import { Panel, Dashbord, Projects } from '../modules';

const URL_API = 'https://maicon-gabriel-alves.vercel.app/api';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
};

const Home: NextPage<Props> = (props) => {
  const [update, setUpdate] = React.useState<boolean>(false);
  const [apiData, setApiData] = React.useState<Props>(props);
  const [pages, setPages] = React.useState<string>('Home');

  const handleOpen = (open: string) => {
    console.log(open);
    setPages(open);
  };

  const handUpdate = async (/* e: boolean */) => {
    setUpdate(!update);
    console.log('update', update);
  };

  // trocando as paginas
  let pagesElement: React.ReactElement;

  switch (pages) {
    case 'Home':
      pagesElement = <Dashbord />;
      break;
    case 'Projects':
      pagesElement = <Projects updateValues={handUpdate} {...apiData} />;
      break;
    case 'Technologys':
      pagesElement = <p>Pagian em construção</p>;
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

      const dataall: Props = {
        projects,
        technologys,
        github,
        values: false,
      };

      setApiData(dataall);

      if (Object.keys(update).length > 0) {
        setUpdate(false);
      }
    }

    getData();
  }, [update]);

  console.log('estado use state', update);

  return (
    <Container direction="row" align="center" justify="center" padding="3">
      <Col xs="auto" className="d-flex h-100">
        <Panel setOpen={handleOpen} />
      </Col>
      <Col>
        <Col xs="auto" className="d-flex w-100">
          {pagesElement}
        </Col>
      </Col>
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

    return {
      props: {
        projects,
        technologys,
        github,
        values: false,
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
      },
    };
  }
};
