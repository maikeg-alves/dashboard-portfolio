import { ITechnologys } from '@interfaces';
import Image from 'next/image';
import { Col } from 'react-bootstrap';
import { Container } from './styles';

type Props = {
  name?: string;
  img?: string;
  description?: string;
  icon?: string;
  ability?: number;
  idTechs?: number[];
  technologys?: ITechnologys[];
  techmode?: boolean;
};

export const Preview: React.FC<Props> = (props) => {
  return (
    <Container>
      <h4 className="my-2">{props.name}</h4>
      <Col className="my-3 preview-img" xs={12}>
        <p className="subtext">preview:</p>
        <Col className="img">
          {props.techmode ? (
            <>
              <Image
                loading="lazy"
                src={
                  props.icon ? props.icon : 'https://i.imgur.com/XhUIa5q.png'
                }
                alt="Picture of the author"
                width={100}
                height={100}
              />
            </>
          ) : (
            <>
              <Image
                loading="lazy"
                src={props.img ? props.img : 'https://i.imgur.com/XhUIa5q.png'}
                alt="Picture of the author"
                width={350}
                height={180}
              />
            </>
          )}
        </Col>
      </Col>
      <Col>
        {props.description && (
          <>
            <p className="subtext">Desscription:</p>
            <p>{props.description}</p>
          </>
        )}
        {props.ability && (
          <>
            <p className="subtext">Habilidade:</p>
            <p>{props.ability}</p>
          </>
        )}
      </Col>
      <Col>
        {props.technologys && (
          <>
            <p className="subtext">Tecnologias:</p>
            <ul>
              {props.technologys
                .filter((res) => props.idTechs?.includes(res.id))
                .map((technology) => (
                  <li key={technology.id}> {technology.name}</li>
                ))}
            </ul>
          </>
        )}
      </Col>
    </Container>
  );
};
