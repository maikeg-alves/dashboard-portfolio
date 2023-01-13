import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { LoadingPage } from '../loadingPage';

import { Form, StepperBox } from './styles';
import { IGithub, IProject, ITechnologys, PUTProject } from '@interfaces';

import { ApiClient, verifyToken } from '@scripts';
import { Preview } from '../PreviewCrad';
import ErrorMessage from '../ErrorMessage/ErrorMessage.component';

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
  admin: boolean;
  statusUpdate: (status: boolean) => void;
};

const FormProject: React.FC<Outputs> = (props) => {
  const [step, setStep] = React.useState<number>(1); //eslint-disable-line

  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [technologys, setTechnologys] = React.useState<ITechnologys[]>([]);
  const [github, setGithub] = React.useState<IGithub[]>([]);

  const [cardData, setcardData] = React.useState<PUTProject>();

  const [looding, setLooding] = React.useState<boolean>(false);
  const [alertmensage, setAlertMensage] = React.useState<string>('');

  let mensage: React.ReactElement;

  const {
    register,
    handleSubmit,
    /*  watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const id = props.projects.map((item) => item.id);

  const CRUD = new ApiClient(Number(id), 'projects');

  const createOrUpdateProject = async (data: PUTProject) => {
    const token = await localStorage.getItem('token');

    if (!props.admin) {
      return setAlertMensage('accessError');
    }

    verifyToken(token).then(() => {
      if (!token) {
        return setAlertMensage('revokedAccess');
      }
    });

    if (token) {
      if (props.values) {
        try {
          setLooding(true);
          const res = await CRUD.update(data, token);

          if (res.code === 505) {
            setAlertMensage('errorUpdate');
            setTimeout(() => {
              props.statusUpdate(true);
            }, 3000);
          }

          if (res.revalidated) {
            setAlertMensage('successUpdate');
            setTimeout(() => {
              props.statusUpdate(true);
            }, 3000);
          }
        } catch (error) {
          console.error(error);
        }
      }

      if (!props.values) {
        try {
          setLooding(true);
          const res = await CRUD.create(data, token);

          if (res.code === 505) {
            setAlertMensage('errorCreating');
            setTimeout(() => {
              props.statusUpdate(true);
            }, 3000);
          }

          if (res.revalidated) {
            setAlertMensage('successCreating');
            setTimeout(() => {
              props.statusUpdate(true);
            }, 3000);
          }

          console.log(res);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

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
              setAlertMensage('existingProject');
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
            return setAlertMensage('selectTechnology');
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
          cardData && createOrUpdateProject(cardData);
          break;
        default:
          console.error('erro ao carregar dodos');
          break;
      }
    } catch (error) {
      console.error(error);
    }
  };

  switch (alertmensage) {
    case 'accessError':
      mensage = <ErrorMessage message="Acesso não autorizado" />;
      break;
    case 'revokedAccess':
      mensage = (
        <ErrorMessage
          message="Token de acesso expirado, porfavor se logue novamente"
          alert="warning"
        />
      );
      break;
    case 'existingProject':
      mensage = <ErrorMessage message="Projeto existente!" alert="warning" />;
      break;
    case 'selectTechnology':
      mensage = (
        <ErrorMessage message="Preencha todos os campos" alert="warning" />
      );
      break;
    case 'successCreating':
      mensage = (
        <ErrorMessage message="Projeto criado com sucesso" alert="success" />
      );
      break;
    case 'errorCreating':
      mensage = <ErrorMessage message="Error ao criar projeto" />;
      break;
    case 'successUpdate':
      mensage = (
        <ErrorMessage message="Projeto editado com sucesso" alert="success" />
      );
      break;
    case 'errorUpdate':
      mensage = <ErrorMessage message="Error ao editar projeto" />;
      break;
    default:
      mensage = <span></span>;
      break;
  }

  React.useEffect(() => {
    props.technologys && setTechnologys(Object.values(props.technologys));

    props.projects && setProjects(Object.values(props.projects));

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

    setTimeout(() => {
      setAlertMensage('');
    }, 3000);
  }, [props, errors, alertmensage]);

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

      {mensage}
    </>
  );
};

export default FormProject;
