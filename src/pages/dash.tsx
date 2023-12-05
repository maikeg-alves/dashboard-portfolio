import React from 'react';
import { Col } from 'react-bootstrap';

import {
  Panel,
  Projects,
  MobilePanel,
  UserArea,
  Statistics,
  Techs,
} from '../modules';
import { Container } from '../layout';

import { LoadingPage } from '@components';
import { DataContext } from '@hook';
import { NextPage } from 'next';

const Dashbord: NextPage = () => {
  const { dados, atualizarDados } = React.useContext(DataContext) || {};
  const [loader, setLoader] = React.useState<boolean>(false);
  const [pages, setPages] = React.useState<string>('Techs');

  React.useEffect(() => {
    setLoader(!dados);
  }, [dados]);

  if (!dados || !atualizarDados) {
    return null;
  }

  const handleOpen = (open: string) => {
    setPages(open);
  };

  const getPageComponent = (page: string) => {
    switch (page) {
      case 'Home':
        return <Statistics {...dados} />;
      case 'Projects':
        return <Projects {...dados} />;
      case 'Techs':
        return <Techs {...dados} />;
      case 'Settings':
        return <UserArea {...dados} />;
      default:
        return <LoadingPage />;
    }
  };

  return (
    <Container direction="column" align="center" justify="center" padding="3">
      {!loader && (
        <>
          <Panel setOpen={handleOpen} {...dados} />
          <Col xs="auto" className="conElementes">
            {getPageComponent(pages)}
          </Col>
          <MobilePanel setOpen={handleOpen} />
        </>
      )}
      {loader && <LoadingPage />}
    </Container>
  );
};

export default Dashbord;
