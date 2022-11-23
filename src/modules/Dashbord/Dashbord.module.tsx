import { Col, Container, Row } from 'react-bootstrap';

import { CircleProgress, Dash, ProgressBar } from './styles';

import { IoReloadOutline } from 'react-icons/io5';

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
                <Col className="progress-items">
                  <p>typescript</p>
                  <ProgressBar variant="determinate" value={98} />
                </Col>
                <Col className="progress-items">
                  <p>javascript</p>
                  <ProgressBar variant="determinate" value={78} />
                </Col>
                <Col className="progress-items">
                  <p>Html</p>
                  <ProgressBar variant="determinate" value={66} />
                </Col>
                <Col className="progress-items">
                  <p>css</p>
                  <ProgressBar variant="determinate" value={55} />
                </Col>
                <Col className="progress-items">
                  <p>java</p>
                  <ProgressBar variant="determinate" value={33} />
                </Col>
              </Col>
            </Col>
            <Col className="RankingLangue modalgrid">
              <h4>Language ranking</h4>
              <Col xs={12}>
                <Col className="progress-items">
                  <p>typescript</p>
                  <ProgressBar variant="determinate" value={98} />
                </Col>
                <Col className="progress-items">
                  <p>javascript</p>
                  <ProgressBar variant="determinate" value={78} />
                </Col>
                <Col className="progress-items">
                  <p>Html</p>
                  <ProgressBar variant="determinate" value={66} />
                </Col>
                <Col className="progress-items">
                  <p>css</p>
                  <ProgressBar variant="determinate" value={55} />
                </Col>
                <Col className="progress-items">
                  <p>java</p>
                  <ProgressBar variant="determinate" value={33} />
                </Col>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="modalgrid status">
              <Row className="justify-content-between">
                <Col xs="auto">
                  <h5>Status</h5>
                </Col>
                <Col xs="auto">
                  <button>
                    <IoReloadOutline />
                  </button>
                </Col>
              </Row>
              <h3>Offline</h3>
            </Col>
            <Col className="modalgrid Experience">
              <Col xs="auto" className="percentage">
                <CircleProgress value={100} variant="determinate" />
                <Col className="progress-text" xs="auto">
                  0
                </Col>
              </Col>
              <h6>Real Experience Score</h6>
            </Col>
          </Row>
        </div>
      </Container>
    </Dash>
  );
};

export default Dashbord;
