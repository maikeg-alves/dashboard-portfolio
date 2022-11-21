import { Col } from 'react-bootstrap';
import { Container } from '../layout';
import { Panel, Dashbord } from '../modules';

const Home = () => {
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
          <Dashbord />
        </Col>
      </Col>
    </Container>
  );
};

export default Home;
