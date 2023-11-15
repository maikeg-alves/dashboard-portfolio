import { Col, Container, Row } from 'react-bootstrap';

import { CardGrid, Dash, ProgressBar } from './styles';

import { IGithub, IProject, ITechnologys } from '@interfaces';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
};

type LanguageCount = { [language: string]: number };

const Dashbord: React.FC<Props> = (props) => {
  function languageCounts(lislanguage: IGithub[]) {
    // Cria um objeto para armazenar os contadores de palavras
    const languageCounts: LanguageCount = {};

    lislanguage.forEach((repo) => {
      if (repo.language in languageCounts) {
        languageCounts[repo.language]++;
      } else {
        languageCounts[repo.language] = 1;
      }
    });

    const sortedLanguages = Object.entries(languageCounts).sort(
      (a, b) => b[1] - a[1],
    );

    return sortedLanguages;
  }

  const mostLanguage = languageCounts(props.github);

  return (
    <Dash>
      <div>
        <h3>Dashboard:</h3>
      </div>
      <Container className="flex-responsive ">
        <Row>
          <CardGrid>
            <h4>Projects</h4>
            <Col xs={12} className="bodyGrid">
              <h2>{props.projects && props.projects.length}</h2>
            </Col>
          </CardGrid>

          <CardGrid>
            <h4>Technologys</h4>
            <Col xs={12} className="bodyGrid">
              <h2>{props.technologys && props.technologys.length}</h2>
            </Col>
          </CardGrid>

          <CardGrid>
            <h6>Most used language</h6>
            <Col xs={12} className="bodyGrid">
              <h3>
                {mostLanguage.length > 0 &&
                  mostLanguage
                    .filter((language) => language[0] !== 'null')
                    .reduce((prev, current) =>
                      prev[1] > current[1] ? prev : current,
                    )[0]}
              </h3>
            </Col>
          </CardGrid>
        </Row>
        <Row>
          <CardGrid>
            <h4>Technology ranking </h4>
            <Col xs={12} className="bodyGridList">
              {props.technologys &&
                props.technologys
                  .slice(0, 5)
                  .sort((a, b) => b.ability - a.ability)
                  .map((technology, id) => (
                    <>
                      <Col className="progress-items" key={id}>
                        <p>{technology.name}</p>
                        <ProgressBar
                          variant="determinate"
                          value={technology.ability}
                        />
                      </Col>
                    </>
                  ))}
            </Col>
          </CardGrid>

          <CardGrid>
            <h4>Language ranking</h4>
            <Col xs={12} className="bodyGridList">
              {mostLanguage.length > 0 &&
                mostLanguage
                  .filter((language) => language[0] !== 'null')
                  .map((project, id) => (
                    <>
                      <Col className="progress-items" key={id}>
                        <p>{project[0]}</p>
                        <ProgressBar
                          variant="determinate"
                          value={project[1] * 10}
                        />
                      </Col>
                    </>
                  ))}
            </Col>
          </CardGrid>
        </Row>
      </Container>
    </Dash>
  );
};

export default Dashbord;
