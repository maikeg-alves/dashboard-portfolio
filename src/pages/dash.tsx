import React from 'react';
import { Col } from 'react-bootstrap';
import useSWR from 'swr';

import { GetServerSideProps, NextPage } from 'next';
import { IGithubRepos, IProject, ITech, Provaider } from '../interfaces';
import { Panel, Dashbord, Projects, MobilePanel, UserArea } from '../modules';
import { Container } from '../layout';
import Technologys from 'src/modules/Technologys/technologys';
import { getData } from '@utils';
import { LoadingPage } from '@components';
import { DataProvider } from '@hook';

const Home: NextPage<Provaider> = (props) => {
  const [update, setUpdate] = React.useState<boolean>(false);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [pages, setPages] = React.useState<string>('Projects');
  /*  const { data: apiData, error: apiError } = useSWR<Props>(props, getData); */

  const handleOpen = (open: string) => {
    setPages(open);
  };

  /*   const handUpdate = () => {
    setUpdate(!update);
  }; */

  let pagesElement: React.ReactElement;

  /*  React.useEffect(() => {
    if (apiData?.projects.length) {
      setTimeout(() => {
        setLoader(false);
      }, 3000);
    }
  }, [apiData?.projects.length]);

  if (!apiData) {
    return (pagesElement = <p></p>);
  } */

  switch (pages) {
    case 'Home':
      pagesElement = <Dashbord {...props} />;
      break;
    case 'Projects':
      pagesElement = <Projects {...props} />;
      break;
    /* 
    case 'Technologys':
      pagesElement = <Technologys updateValues={handUpdate} {...apiData} />;
      break;
    case 'Settings':
      pagesElement = <UserArea {...apiData} />;
      break; */
    default:
      pagesElement = <p> dados não encontrado </p>;
  }

  /*   if (apiError) {
    return (pagesElement = <p>Error fetching data from the API</p>);
  }

  console.log(apiData); */

  console.log(props);

  return (
    <Container direction="column" align="center" justify="center" padding="3">
      {!loader && (
        <>
          <Panel setOpen={handleOpen} {...props} />
          <Col xs="auto" className="conElementes">
            {pagesElement}
          </Col>
          <MobilePanel setOpen={handleOpen} />
        </>
      )}
      {loader && <LoadingPage />}
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const data = await DataProvider();

    return {
      props: data,
    };
  } catch (error) {
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
