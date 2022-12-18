import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Form, StepperBox } from './styles';
import { IGithub, IProject, ITechnologys, PUTProject } from '@interfaces';

import { _CRUD } from '../../scripts';

/* import { Alert } from '@mui/material'; */

const steps = [
  'name, Github, description',
  'image url, technologies',
  'preview ',
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
  const [step, setStep] = React.useState(1); //eslint-disable-line

  const [update, setupdate] = React.useState<boolean>(false);
  const [technologys, setTechnologys] = React.useState<ITechnologys[]>();
  const [github, setGithub] = React.useState<IGithub[]>([]);
  const [projects, setProjects] = React.useState<IProject[]>([]);

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

    const createOrUpdateProject = (data: PUTProject) => {
      if (props.values) {
        CRUD.update(data).then((res) => {
          if (res.revalidated) {
            alert('projeto editado com sucesso');
            setupdate(true);
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
        });
      } else {
        console.log('values do crete', data);
        CRUD.create(data).then((res) => {
          if (res.revalidated) {
            alert('projeto criado com sucesso');
            setupdate(true);
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
        });
      }
    };

    try {
      switch (step) {
        case 1:
          const checkname = projects.map((project) => {
            if (project.name === projectName) {
              return null;
            }
          });

          if (checkname === null) {
            alert('project name must be provided');
          }

          setStep(2);
          break;
        case 2:
          alert('step 2');
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
          setStep(3);
          break;
        case 3:
          alert('step 3');

          const data: PUTProject = {
            name: projectName,
            github: githubRepository,
            description: description !== undefined ? description : '',
            difficulty: Number(difficulty),
            img: image_url,
            gif: image_url,
            technologys_id: [
              Number(technologies_one),
              Number(technologies_two),
              Number(technologies_three),
            ],
          };

          createOrUpdateProject(data);
          break;
        default:
          alert('sla mané');
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
                        required: false,
                        maxLength: 1000,
                      })}
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
                        `${props.projects.map((item) => item.img)}`
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
              <Col xs={12}>
                <p>Preview card</p>
              </Col>

              <Col xs="auto"></Col>
            </>
          )}

          <Col xs={12} className="d-flex justify-content-center">
            <button type="submit" /* disabled={} */> DONE </button>
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
