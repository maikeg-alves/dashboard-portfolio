import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { LoadingPage } from '../loadingPage';

import { Form, StepperBox } from './styles';
import { IGithub, IProject, ITechnologys, ITechnologysCRUD } from '@interfaces';

import { ApiClient, verifyToken } from '@utils';
import { Preview } from '../PreviewCrad';
import ErrorMessage from '../ErrorMessage/ErrorMessage.component';

/* import { Alert } from '@mui/material'; */

const steps = ['name, Github, description', 'image url, technologies'];

type Inputs = {
  techName: string;
  Ability: number;
  urlicon: string;
};

type Outputs = {
  projects: IProject[];
  technologys: ITechnologys[];
  github: IGithub[];
  id: number;
  values: boolean;
  admin: boolean;
  statusUpdate: (status: boolean) => void;
};

const FormTechnology: React.FC<Outputs> = (props) => {
  const [step, setStep] = React.useState<number>(1); //eslint-disable-line

  const [cardData, setcardData] = React.useState<ITechnologysCRUD>();

  const [looding, setLooding] = React.useState<boolean>(false);

  const [alertmensage, setAlertMensage] = React.useState<string>('');

  let mensage: React.ReactElement;

  const {
    register,
    handleSubmit,
    /*  watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const CRUD = new ApiClient(Number(props.id), 'technologys');

  // script base de CRUD

  const createOrUpdateTechnology = async (data: ITechnologysCRUD) => {
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
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // função do formularios

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // values of form state

    const { techName, Ability, urlicon } = data;

    try {
      switch (step) {
        case 1:
          const techcheck = props.technologys.some((tech) => {
            if (!props.values) {
              if (tech.name === techName || tech.icon === urlicon) {
                return true;
              }
              return false;
            }
          });

          if (techcheck) {
            setAlertMensage('existingProject');
          }

          if (Ability === 0) {
            return setAlertMensage('selectTechnology');
          }

          const data: ITechnologysCRUD = {
            name: techName,
            ability: Number(Ability),
            icon: urlicon.includes('https://')
              ? urlicon
              : 'https://raw.githubusercontent.com/jmnote/z-icons/master/svg/github.svg',
          };

          if (data !== undefined && !techcheck) {
            setcardData(data);
            setStep(2);
          }

          break;
        case 2:
          if (cardData) {
            createOrUpdateTechnology(cardData);
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
      mensage = (
        <ErrorMessage message="Technologia existente!" alert="warning" />
      );
      break;
    case 'selectTechnology':
      mensage = (
        <ErrorMessage message="Preencha todos os campos" alert="warning" />
      );
      break;
    case 'successCreating':
      mensage = (
        <ErrorMessage
          message="Technologia criada com sucesso"
          alert="success"
        />
      );
      break;
    case 'errorCreating':
      mensage = (
        <ErrorMessage message="Error ao criar projeto, verifique se está repetindo item unicos" />
      );
      break;
    case 'successUpdate':
      mensage = (
        <ErrorMessage
          message="Technologia editada com sucesso"
          alert="success"
        />
      );
      break;
    case 'errorUpdate':
      mensage = <ErrorMessage message="Error ao editar projeto" />;
      break;
    default:
      mensage = <span></span>;
  }

  React.useEffect(() => {
    setTimeout(() => {
      setAlertMensage('');
    }, 3000);
  }, [alertmensage]);

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
                  {/* formulario de update */}
                  <Form.Group>
                    <Form.Label>Technology Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`${
                        props.values &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.name)
                      }`}
                      {...register('techName', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
                      value={
                        errors.techName &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.name)
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Ability</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`${
                        props.values &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.ability)
                      }`}
                      {...register('Ability', {
                        required: true,
                        pattern: /^(?:100|[1-9]?\d)$/,
                        max: 100,
                      })}
                      value={
                        errors.Ability &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.ability)
                          .join(', ')
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Url icon</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`${
                        props.values &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.icon)
                      }`}
                      {...register('urlicon', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
                      value={
                        errors.urlicon &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.icon)
                      }
                    />
                  </Form.Group>
                </>
              ) : (
                <>
                  {/* formulario de criação */}
                  <Form.Group>
                    <Form.Label>Technology Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={'Technology name'}
                      {...register('techName', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
                      style={{
                        border: errors.techName
                          ? '2px solid red'
                          : '1px solid #ced4da',
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Ability</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={'Ability Technology'}
                      {...register('Ability', {
                        required: true,
                        pattern: /^(?:100|[1-9]?\d)$/,
                        max: 100,
                      })}
                      style={{
                        border: errors.Ability
                          ? '2px solid red'
                          : '1px solid #ced4da',
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Url icon</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={'Icon Technology'}
                      {...register('urlicon', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
                      style={{
                        border: errors.urlicon
                          ? '2px solid red'
                          : '1px solid #ced4da',
                      }}
                    />
                  </Form.Group>
                </>
              )}
            </>
          )}

          {step === 2 && (
            <>
              <Col xs="auto">
                {looding ? (
                  <LoadingPage />
                ) : (
                  <Preview
                    techmode
                    name={cardData?.name}
                    icon={cardData?.icon}
                    ability={cardData?.ability}
                  />
                )}
              </Col>
            </>
          )}

          <Col xs={12} className="d-flex justify-content-center">
            <button type="submit">
              {step === 1 ? 'Confirma' : 'Finalizar'}
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

export default FormTechnology;
