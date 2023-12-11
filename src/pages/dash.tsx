import React from 'react';
import { Col } from 'react-bootstrap';

import { PanelDash, Projects, UserArea, Statistics, Techs } from '../modules';
import { Container } from '../layout';

import { LoadingPage } from '@components';
import { DataContext } from '@hook';
import { NextPage } from 'next';

const Dashbord: NextPage = () => {
  const { dados, carregarDadosIniciais } = React.useContext(DataContext) || {};
  const [loader, setLoader] = React.useState<boolean>(true);
  const [pages, setPages] = React.useState<string>('Home');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (carregarDadosIniciais && !dados?.values) {
          await carregarDadosIniciais();
        }
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [carregarDadosIniciais, dados]);

  if (!dados) {
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
    <Container direction="row" align="center" justify="around" padding="3">
      {!loader && (
        <>
          <Col xs={'auto'} className="h-100 p-0">
            <PanelDash setOpen={handleOpen} {...dados} />
          </Col>
          <Col xs="auto" className="conElementes h-100 pt-3">
            {getPageComponent(pages)}
          </Col>
        </>
      )}
      {loader && <LoadingPage />}
    </Container>
  );
};

export default Dashbord;
