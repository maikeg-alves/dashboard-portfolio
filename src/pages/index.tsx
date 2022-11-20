import { Col } from 'react-bootstrap';
import { Container } from '../layout';
import { Panel } from '../modules';

const Home = () => {
  return (
    <Container direction="row">
      <Col xs="auto" className="d-flex">
        <Panel />
      </Col>
      <Col>
        <Col xs="auto">
          <h1>deshbord2</h1>
        </Col>
      </Col>
    </Container>
  );
};

export default Home;
