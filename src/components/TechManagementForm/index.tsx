import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Form, StepperBox } from './styles';
import { Provaider } from '@interfaces';

import { Steps } from './steps';
import { SelecteComponet } from 'src/interfaces/component';
import { baseUrl, closeAlertWithDelay } from '@utils';
import { ApiManager, DataContext } from '@hook';
import { technologyStatusMessages } from './exceptions';
import { StatusCodes } from '../auth/login/exceptions';

const steps = ['name, icon url, description', 'preview', 'finish'];

interface PropsManagementForm extends Provaider {
  update?: boolean;
  hide: () => void;
}

type Inputs = {
  name: string;
  icon: string;
  description: string;
  checkPreview: boolean;
};

enum SetComponet {
  StepOne = 0,
  StepTwo = 1,
  StepThee = 2,
}

const TechManagementForm: React.FC<PropsManagementForm> = (props) => {
  const context = React.useContext(DataContext);
  const [Element, setElement] = React.useState<JSX.Element | null>(null);
  const [showAlert, setShowAlert] = React.useState(false);

  const [step, setStep] = React.useState<number>(SetComponet.StepOne);
  const [check, setCheck] = React.useState<boolean>(false);
  const [apiManager] = React.useState(
    new ApiManager(
      `${baseUrl}techs/${
        props.update ? `update/${props.techs[0].id}` : 'create'
      }`,
    ),
  );

  const methods = useForm<Inputs>();

  const { reset } = methods;

  const onSubmit: SubmitHandler<Inputs> = async () => {
    const { name, icon, description, checkPreview } = methods.getValues();
    if (name && icon && description) {
      setStep(SetComponet.StepTwo);

      if (checkPreview) {
        setStep(SetComponet.StepThee);

        const bodyData = {
          name: name,
          icon: icon,
          description: description,
        };

        try {
          const response = await (props.update
            ? apiManager.putData(bodyData)
            : apiManager.postData(bodyData));

          if (!response.success && response.error) {
            setElement(technologyStatusMessages[response.error.statusCode]);
            closeAlertWithDelay(6000, setShowAlert);
            setStep(SetComponet.StepOne);
            reset();
            return;
          }

          context?.atualizarDados();
          setElement(technologyStatusMessages[StatusCodes.CREATED]);
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
    [SetComponet.StepThee]: <Steps.Thee success={check} {...props} />,
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
                  {step != SetComponet.StepOne && step != SetComponet.StepThee
                    ? 'Finalizar'
                    : 'Confirma'}
                </button>
              </Col>
            )}
          </Form>
        </FormProvider>
      </Col>

      <StepperBox>
        <Stepper activeStep={!check ? step : 4} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={() => setStep(index)}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </StepperBox>

      {showAlert && Element}
    </>
  );
};

export default TechManagementForm;
