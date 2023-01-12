import { Col, Container, Row } from 'react-bootstrap';

import { Dash, ProgressBar } from './styles';

import { IGithub, IProject, ITechnologys } from '@interfaces';

type Props = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
};

type LanguageCount = { [language: string]: number };

const Dashbord: React.FC<Props> = (props) => {
  // Create an object to store the language counts

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

    // Sort data in descending order
    const sortedLanguages = Object.entries(languageCounts).sort(
      (a, b) => b[1] - a[1],
    );

    return sortedLanguages;
  }

  const mostLanguage = languageCounts(props.github);

  console.log(mostLanguage);

  return (
    <Dash>
      <div>
        <h3>Dashbord:</h3>
      </div>
      <Container className="flex-responsive ">
        <Row>
          <Col className="Projects modalgrid">
            <h4>Projects</h4>
            <Col xs={12}>
              <h2>{props.projects && props.projects.length}</h2>
            </Col>
          </Col>

          <Col className="Technologys modalgrid">
            <h4>Technologys</h4>
            <Col xs={12}>
              <h2>{props.technologys && props.technologys.length}</h2>
            </Col>
          </Col>
          <Col className="Visitors modalgrid">
            <h5>Most used language</h5>
            <Col xs={12}>
              <h3>
                {mostLanguage.length > 0 &&
                  mostLanguage
                    .filter((language) => language[0] !== 'null')
                    .reduce((prev, current) =>
                      prev[1] > current[1] ? prev : current,
                    )[0]}
              </h3>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col className="RankingTech modalgrid">
            <h4>Technology ranking </h4>
            <Col xs={12}>
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
          </Col>
          <Col className="RankingLangue modalgrid">
            <h4>Language ranking</h4>
            <Col xs={12}>
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
          </Col>
        </Row>
      </Container>
    </Dash>
  );
};

export default Dashbord;
