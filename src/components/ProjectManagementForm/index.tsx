import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Form, StepperBox } from './styles';
import { Provaider } from '@interfaces';

import { Steps } from './Steps';
import { ApiManager } from '@hook';
import { baseUrl } from '@utils';

const steps = [
  'name, Github, description',
  'image url, technologies',
  'concluir',
];

type Inputs = {
  projectName: string;
  githubRepository: string;
  description: string;
  image_url: string;
  difficulty: number;
  technologies: number[];
};

interface PropsManagementForm extends Provaider {
  update?: boolean;
}

enum SetComponet {
  StepOne = 0,
  StepTwo = 1,
  StepThee = 2,
}

interface SelecteComponet {
  [key: number]: JSX.Element;
}

export const ProjectManagementForm: React.FC<PropsManagementForm> = (props) => {
  const [step, setStep] = React.useState<number>(SetComponet.StepOne);
  const [check, setCheck] = React.useState<boolean>(false);
  const [apiManager] = React.useState(
    new ApiManager(
      `${baseUrl}projects/${
        props.update ? `update/${props.projects[0].id}` : 'create'
      }`,
    ),
  );

  async function postData<T>(dados: T) {
    try {
      const data: T = await apiManager.postData(dados);
      return data;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      throw error;
    }
  }

  async function updateData<T>(dados: T) {
    try {
      const data: T = await apiManager.putData(dados);
      return data;
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      throw error;
    }
  }

  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const {
      projectName,
      githubRepository,
      description,
      image_url,
      technologies,
    } = methods.getValues();

    if ((projectName && githubRepository) || description) {
      setStep(SetComponet.StepTwo);

      if (image_url && technologies.length !== 0) {
        setStep(SetComponet.StepThee);

        const bodyData = {
          name: projectName,
          thumbnail_url: image_url,
          githubRepoId: githubRepository,
          techs: technologies,
          description: description ? description : null,
        };

        if (props.update) {
          const response = await updateData(bodyData);
          console.log(response);
        }

        const response = await postData(bodyData);
        console.log(response);

        /* 
        setTimeout(() => {
          setCheck(true);
          console.log(bodyData);
        }, 3000); */
      }
    }
  };

  const SetStepsComponet: SelecteComponet = {
    [SetComponet.StepOne]: <Steps.One {...props} />,
    [SetComponet.StepTwo]: <Steps.Two {...props} />,
    [SetComponet.StepThee]: <Steps.Thee success={check} />,
  };

  return (
    <>
      <Col xs={12}>
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(onSubmit)}>
            {SetStepsComponet[step]}
            {step != SetComponet.StepThee && (
              <Col xs={12} className="d-flex justify-content-center">
                <button type="submit" className="w-100">
                  {step != SetComponet.StepOne ? 'Finalizar' : 'Confirma'}
                </button>
              </Col>
            )}
          </Form>
        </FormProvider>
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
