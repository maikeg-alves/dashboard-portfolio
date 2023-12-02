import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Form, StepperBox } from './styles';
import { Provaider } from '@interfaces';

import { Steps } from './Steps';
import { ApiManager, DataContext } from '@hook';
import { baseUrl, closeAlertWithDelay } from '@utils';
import { statusMessages } from './exceptions';
import { StatusCodes } from '../auth/login/exceptions';

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
  hide: () => void;
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
  const context = React.useContext(DataContext);
  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const [step, setStep] = React.useState<number>(SetComponet.StepOne);
  const [check, setCheck] = React.useState<boolean>(false);
  const [apiManager] = React.useState(
    new ApiManager(
      `${baseUrl}projects/${
        props.update ? `update/${props.projects[0].id}` : 'create'
      }`,
    ),
  );

  const methods = useForm<Inputs>();

  const { reset } = methods;

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

        try {
          const response = await (props.update
            ? apiManager.putData(bodyData)
            : apiManager.postData(bodyData));

          if (!response.success && response.error) {
            setElement(statusMessages[response.error.statusCode]);
            closeAlertWithDelay(6000, setShowAlert);
            setStep(SetComponet.StepOne);
            reset();
            return;
          }
          context?.atualizarDados();
          setElement(statusMessages[StatusCodes.CREATED]);
          closeAlertWithDelay(6000, setShowAlert);
          setCheck(true);

          setTimeout(() => {
            props.hide();
          }, 3000);
        } catch (error) {
          console.error('Erro ao enviar dados:', error);
        }
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
        <Stepper activeStep={!check ? step : 4} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepperBox>

      {showAlert && Element}
    </>
  );
};
