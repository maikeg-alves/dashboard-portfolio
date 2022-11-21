import { Col, Container, Row } from 'react-bootstrap';

import { Dash } from './styles';

const Dashbord: React.FC = () => {
  return (
    <Dash xs={12}>
      <div>
        <h3>Dashbord</h3>
      </div>
      <Container>
        <div>
          <Row>
            <Col className="Projects modalgrid">
              <h4>Projects</h4>
              <Col xs={12}>
                <h2>0</h2>
              </Col>
            </Col>

            <Col className="Technologys modalgrid">
              <h4>Technologys</h4>
              <Col xs={12}>
                <h2>0</h2>
              </Col>
            </Col>
            <Col className="Visitors modalgrid">
              <h6>Visitors in the past 3 minutes</h6>
              <Col xs={12}>
                <h2>0</h2>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="RankingTech modalgrid">
              <h4>Technology ranking </h4>
              <Col xs={12}>
                <h2>0</h2>
              </Col>
            </Col>
            <Col className="RankingLangue modalgrid">
              <h4>Language ranking</h4>
              <Col xs={12}>
                <h2>0</h2>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="modalgrid">1 of 3</Col>
            <Col className="modalgrid">2 of 3</Col>
            <Col className="modalgrid">2 of 3</Col>
          </Row>
        </div>
      </Container>
    </Dash>
  );
};

export default Dashbord;
