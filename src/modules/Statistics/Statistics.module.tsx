import { Col, Container, Row } from 'react-bootstrap';

import { CardGrid, Dash, ProgressBar } from './styles';

import { Provaider, IGithubRepos } from '@interfaces';
import React from 'react';
import { LoadingPage } from '@components';

type LanguageCount = { [language: string]: number };

const Statistics: React.FC<Provaider> = (props) => {
  const [statistics, setStatistics] = React.useState<Provaider>(
    {} as Provaider,
  );

  function languageCounts(reposGithub: IGithubRepos[]) {
    const languageCounts: LanguageCount = {};

    reposGithub.forEach((repo) => {
      if (repo.language && repo.language != null) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languageCounts).sort(
      (a, b) => b[1] - a[1],
    );

    return sortedLanguages;
  }

  const mostLanguage = languageCounts(props.github);

  React.useEffect(() => {
    setStatistics(props || {});
  }, [props]);

  const StatisticsIsValid =
    statistics.github?.length &&
    statistics.techs?.length &&
    statistics.projects?.length;

  return !StatisticsIsValid ? (
    <LoadingPage />
  ) : (
    <Dash>
      <Container className="flex-responsive ">
        <div>
          <h3>Statistics:</h3>
        </div>
        <Row>
          <CardGrid>
            <h4>Projects</h4>
            <Col xs={12} className="bodyGrid">
              <h2>{(props.projects && props.projects.length) || 0}</h2>
            </Col>
          </CardGrid>

          <CardGrid>
            <h4>Technologys</h4>
            <Col xs={12} className="bodyGrid">
              <h2>{(props.techs && props.techs.length) || 0}</h2>
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
              {props.techs &&
                props.techs
                  .slice(0, 5)
                  .sort(
                    (a, b) =>
                      (b.projects?.length || 0) - (a.projects?.length || 0),
                  )
                  .map((technology, id) => (
                    <>
                      <Col className="progress-items" key={id}>
                        <p>{technology.name}</p>
                        <ProgressBar
                          variant="determinate"
                          value={(technology.projects?.length || 0) * 20}
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
                    <Col className="progress-items" key={id}>
                      <p>{project[0]}</p>
                      <ProgressBar
                        variant="determinate"
                        value={project[1] * 10}
                      />
                    </Col>
                  ))}
            </Col>
          </CardGrid>
        </Row>
      </Container>
    </Dash>
  );
};

export default Statistics;
