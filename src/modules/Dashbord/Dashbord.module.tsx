import { Col, Container, Row } from 'react-bootstrap';

import { CircleProgress, Dash, ProgressBar } from './styles';

import { IoReloadOutline } from 'react-icons/io5';
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

    const list = lislanguage
      .filter((github) => github.language !== undefined)
      .map((github) => github.language);

    // Itera sobre o array de palavras
    for (const language of list) {
      // Incrementa o contador para a palavra atual
      if (language in languageCounts) {
        languageCounts[language]++;
      } else {
        languageCounts[language] = 1;
      }
    }

    let maxLanguage: string | null = null;
    let maxCount = 0;

    for (const [language, count] of Object.entries(languageCounts)) {
      if (count > maxCount) {
        maxLanguage = language;
        maxCount = count;
      }
    }

    return maxLanguage;
  }

  const resposta = languageCounts(props.github);

  console.log(resposta);

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
              <h6>Most used language</h6>
              <Col xs={12}>
                <h4>{languageCounts(props.github)}</h4>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col className="RankingTech modalgrid">
              <h4>Technology ranking </h4>
              <Col xs={12}>
                {props.technologys &&
                  props.technologys.slice(0, 5).map((technology, id) => (
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
                {props.projects &&
                  props.projects.slice(0, 5).map((project, id) => (
                    <>
                      <Col className="progress-items" key={id}>
                        <p>{project.name}</p>
                        <ProgressBar
                          variant="determinate"
                          value={project.difficulty}
                        />
                      </Col>
                    </>
                  ))}
              </Col>
            </Col>
          </Row>
        </div>
      </Container>
    </Dash>
  );
};

export default Dashbord;
