import { GetStaticProps, NextPage } from 'next';
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
  const handleOpen = (open: string) => {
    console.log(open);
  };

  return (
    <Container direction="row" align="center" justify="center" padding="3">
      <Col xs="auto" className="d-flex h-100">
        <Panel setOpen={handleOpen} />
      </Col>
      <Col>
        <Col xs="auto" className="d-flex w-100">
          {/*   <Dashbord /> */}
          <Projects {...props} />
        </Col>
      </Col>
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data1 = await fetch(`${URL_API}/projects`);
    const data2 = await fetch(`${URL_API}/technologys`);
    const datagit = await fetch(
      'https://api.github.com/users/maikeg-alves/repos',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      },
    );

    const github = await datagit.json();
    const dateProjects = await data1.json();
    const technologys = await data2.json();

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
