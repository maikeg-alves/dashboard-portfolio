import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { LoadingPage } from '../loadingPage';

import { Form, StepperBox } from './styles';
import { IGithub, IProject, ITechnologys, PUTProject } from '@interfaces';

import { _CRUD } from '../../scripts';
import { Preview } from '../PreviewCrad';

/* import { Alert } from '@mui/material'; */

const steps = [
  'name, Github, description',
  'image url, technologies',
  'Concluir ',
];

type Inputs = {
  projectName: string;
  githubRepository: string;
  description: string;
  image_url: string;
  difficulty: number;
  technologies_one: number;
  technologies_two: number;
  technologies_three: number;
};

type Outputs = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
  statusUpdate?: (status: boolean) => void;
  stateCreate?: (status: boolean) => void;
};

const FormProject: React.FC<Outputs> = (props) => {
  const [step, setStep] = React.useState<number>(1); //eslint-disable-line

  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [technologys, setTechnologys] = React.useState<ITechnologys[]>([]);
  const [github, setGithub] = React.useState<IGithub[]>([]);

  const [cardData, setcardData] = React.useState<PUTProject>();

  const [update, setupdate] = React.useState<boolean>(false);
  const [looding, setLooding] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    /*  watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // values of form state

    const {
      projectName,
      githubRepository,
      description,
      image_url,
      difficulty,
      technologies_one,
      technologies_two,
      technologies_three,
    } = data;

    // converter valores em numbe

    const id = props.projects.map((item) => item.id);

    const CRUD = new _CRUD(Number(id), 'projects');

    const errorMessages = [
      'input 1 não foi selected',
      'input 2 não foi selected',
      'input 3 não foi selected',
    ];

    const defaultValues = {
      description: githubDescription(githubRepository, props.github),
      img: 'https://i.imgur.com/XhUIa5q.png',
      gif: 'https://i.imgur.com/XhUIa5q.png',
    };

    function githubDescription(repo: string, data: IGithub[]): string {
      const description = data
        .filter((res) => res.name === repo)
        .map((res) => res.description)[0];
      return String(description);
    }

    const createOrUpdateProject = async (data: PUTProject) => {
      if (props.values) {
        try {
          setLooding(true);
          const res = await CRUD.update(data);
          if (res.revalidated) {
            alert('projeto editado com sucesso');
            setupdate(true);
            setLooding(false);
            if (props.statusUpdate !== undefined) {
              props.statusUpdate(update);
            }
          } else {
            alert('error ao editar projeto');
            setupdate(false);
            if (props.statusUpdate !== undefined) {
              props.statusUpdate(update);
            }
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          setLooding(true);
          const res = await CRUD.create(data);
          if (res.revalidated) {
            alert('projeto criado com sucesso');
            setupdate(true);
            setLooding(false);
            if (props.stateCreate !== undefined) {
              props.stateCreate(update);
            }
          } else {
            alert('error ao criar projeto');
            setupdate(false);
            if (props.stateCreate !== undefined) {
              props.stateCreate(update);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    try {
      switch (step) {
        case 1:
          if (!props.values) {
            const projectExists = projects.some(
              (project) =>
                project.name === projectName ||
                project.github === githubRepository,
            );

            if (projectExists) {
              setStep(1);
              alert('projeto existe');
            } else {
              setStep(2);
            }
          } else {
            setStep(2);
          }
          break;
        case 2:
          if (
            Number(technologies_one) === 0 ||
            Number(technologies_two) === 0 ||
            Number(technologies_three) === 0
          ) {
            const index = [
              Number(technologies_one),
              Number(technologies_two),
              Number(technologies_three),
            ].indexOf(0);
            return alert(errorMessages[index]);
          }

          const data: PUTProject = {
            name: projectName,
            github: githubRepository,
            description:
              description !== 'null' && typeof description !== 'undefined'
                ? description
                : defaultValues.description,
            difficulty: Number(difficulty),
            img: image_url.includes('https://i.imgur.com/')
              ? image_url
              : defaultValues.img,
            gif: image_url.includes('https://i.mgur.com/')
              ? image_url
              : defaultValues.gif,
            technologys_id: [
              Number(technologies_one),
              Number(technologies_two),
              Number(technologies_three),
            ],
          };

          if (data !== undefined) {
            setcardData(data);
          }

          setStep(3);
          break;
        case 3:
          if (cardData) {
            createOrUpdateProject(cardData);
          }
          break;
        default:
          console.error('erro ao carregar dodos');
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (props.technologys) {
      setTechnologys(Object.values(props.technologys));
    }

    if (props.projects) {
      setProjects(Object.values(props.projects));
    }

    if (props.github) {
      // filter github repositories for updated_at
      const atualdate = new Date();
      setGithub(
        Object.values(props.github)
          .filter((x) => new Date(x.updated_at).getTime() < atualdate.getTime())
          .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
          .slice(0, 10),
      );
    }
  }, [props, errors]);

  return (
    <>
      <Col xs={12}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              {/* values é ativado quando o valor é 
              mudado para o projeto deve ser editado e não criado */}
              {props.values ? (
                <>
                  <Form.Group>
                    <Form.Label>Project name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`${
                        props.values && props.projects.map((item) => item.name)
                      }`}
                      {...register('projectName', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
                      value={
                        errors.projectName &&
                        `${props.projects.map((item) => item.name)}`
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Github repo</Form.Label>
                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('githubRepository', {
                        required: true,
                      })}
                    >
                      {props.projects.map((item, index) => (
                        <option key={index} value={item.github}>
                          {item.github}
                        </option>
                      ))}

                      {github.length > 0 &&
                        github.map((tech) => (
                          <option key={tech.id} value={tech.name}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Descriotion</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder={`${
                        props.values &&
                        props.projects.map((item) => item.description)
                      }`}
                      style={{ height: '100px' }}
                      {...register('description', {
                        required: true,
                        maxLength: 1000,
                      })}
                      value={
                        errors.description &&
                        `${props.projects.map((item) => item.description)}`
                      }
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label>Project name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={'project name'}
                      {...register('projectName', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
                      style={{
                        border: errors.projectName
                          ? '2px solid red'
                          : '1px solid #ced4da',
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Github repo</Form.Label>
                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('githubRepository', {
                        required: true,
                      })}
                    >
                      <option value={props.values ? 'teste' : ''}>
                        Open this select menu
                      </option>
                      {github.length > 0 &&
                        github.map((tech) => (
                          <option key={tech.id} value={tech.name}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Descriotion</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a comment here"
                      style={{ height: '100px' }}
                      {...(register('description'),
                      {
                        required: false,
                        maxLength: 200,
                      })}
                    />
                  </Form.Group>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              {props.values ? (
                <>
                  <Form.Group>
                    <Form.Label>Image url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`${props.projects.map((item) => item.img)}`}
                      {...register('image_url', {
                        required: true,
                      })}
                      value={
                        errors.image_url &&
                        `${props.projects.map((item) =>
                          item.img !== undefined || item.img !== ''
                            ? item.img
                            : 'https://i.imgur.com/XhUIa5q.png',
                        )}`
                      }
                    />
                  </Form.Group>

                  <Form.Group className="my-2">
                    <Form.Label className="pb-2">Difficulty</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`${props.projects.map(
                        (item) => item.difficulty,
                      )}`}
                      {...register('difficulty', {
                        required: true,
                        max: 100,
                      })}
                      value={
                        errors.difficulty &&
                        `${props.projects.map((item) => item.difficulty)}`
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Tecnologi</Form.Label>
                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('technologies_one', {
                        required: true,
                      })}
                    >
                      <option
                        selected
                        disabled
                        label="Open this select menu"
                      ></option>
                      {technologys &&
                        technologys.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>

                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('technologies_two', {
                        required: true,
                      })}
                    >
                      <option
                        selected
                        disabled
                        label="Open this select menu"
                      ></option>
                      {technologys &&
                        technologys.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>

                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('technologies_three', {
                        required: true,
                      })}
                    >
                      <option
                        selected
                        disabled
                        label="Open this select menu"
                      ></option>
                      {technologys &&
                        technologys.map((tech) => (
                          <option key={tech.id} value={Number(tech.id)}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group>
                    <Form.Label>Image url</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="image url"
                      {...register('image_url', {
                        required: true,
                      })}
                      style={{
                        border: errors.image_url
                          ? '2px solid red'
                          : '1px solid #ced4da',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="my-2">
                    <Form.Label className="pb-2">Difficulty</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={'difficulty '}
                      {...register('difficulty', {
                        required: true,
                        max: 100,
                      })}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Tecnologi</Form.Label>
                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('technologies_one', {
                        required: true,
                      })}
                    >
                      <option value={0}>Open this select menu</option>
                      {technologys &&
                        technologys.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>

                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('technologies_two', {
                        required: true,
                      })}
                    >
                      <option value={0}>Open this select menu</option>
                      {technologys &&
                        technologys.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>

                    <Form.Select
                      aria-label="Floating label select example"
                      {...register('technologies_three', {
                        required: false,
                      })}
                    >
                      <option value={0}>Open this select menu</option>
                      {technologys &&
                        technologys.map((tech) => (
                          <option key={tech.id} value={tech.id}>
                            {tech.name}
                          </option>
                        ))}
                    </Form.Select>
                  </Form.Group>
                </>
              )}
            </>
          )}

          {step === 3 && (
            <>
              <Col xs="auto">
                {looding ? (
                  <LoadingPage />
                ) : (
                  <Preview
                    name={cardData?.name}
                    img={cardData?.img}
                    description={cardData?.description}
                    idTechs={cardData?.technologys_id}
                    technologys={technologys}
                  />
                )}
              </Col>
            </>
          )}
          <Col xs={12} className="d-flex justify-content-center">
            <button type="submit">
              {step === 1 || step === 2 ? 'Confirma' : 'Finalizar'}
            </button>
          </Col>
        </Form>
      </Col>

      <StepperBox>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepperBox>
    </>
  );
};

export default FormProject;
