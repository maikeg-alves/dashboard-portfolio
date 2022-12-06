import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Form, StepperBox } from './styles';
import { IGithub, IProject, ITechnologys } from '@interfaces';
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
  technologies_one: string;
  technologies_two: string;
  technologies_three: string;
};

type Outputs = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  values: boolean;
};

const FormProject: React.FC<Outputs> = (props) => {
  const [step, setStep] = React.useState(1); //eslint-disable-line

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
    try {
      const {
        projectName,
        githubRepository,
        description,
        image_url,
        technologies_one,
        technologies_two,
        technologies_three,
      } = data;

      if ((projectName && githubRepository) || description) {
        setStep(2);
        projects.map((item) => {
          if (item.name === projectName) {
            return console.error('projeto existente');
          }
        });
      }

      if (
        image_url &&
        technologies_one &&
        technologies_two &&
        technologies_three
      ) {
        if (technologies_one !== technologies_two && technologies_three) {
          if (technologies_two !== technologies_one && technologies_three) {
            if (technologies_three !== technologies_two && technologies_one) {
              setStep(3);
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }

    console.log(data);
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
  }, [props]);

  console.log(props.values);

  return (
    <>
      <Col xs={12}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <Form.Group>
                <Form.Label>Project name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`${
                    props.values
                      ? props.projects.map((item) => item.name)
                      : 'projectName'
                  }`}
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
                  {...register('githubRepository')}
                >
                  <option>Open this select menu</option>
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

          {step === 2 && (
            <>
              <Form.Group>
                <Form.Label>Image url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="image url"
                  {...register('image_url')}
                  style={{
                    border: errors.image_url
                      ? '2px solid red'
                      : '1px solid #ced4da',
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tecnologi</Form.Label>
                <Form.Select
                  aria-label="Floating label select example"
                  {...register('technologies_one')}
                >
                  <option>Open this select menu</option>
                  {technologys &&
                    technologys.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Select
                  aria-label="Floating label select example"
                  {...register('technologies_two')}
                >
                  <option>Open this select menu</option>
                  {technologys &&
                    technologys.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ))}
                </Form.Select>
                <Form.Select
                  aria-label="Floating label select example"
                  {...register('technologies_three')}
                >
                  <option>Open this select menu</option>
                  {technologys &&
                    technologys.map((tech) => (
                      <option key={tech.id} value={tech.id}>
                        {tech.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group></Form.Group>
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
            <button type="submit"> DONE </button>
          </Col>
        </Form>
      </Col>

      <StepperBox>
        <Stepper activeStep={1} alternativeLabel>
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
