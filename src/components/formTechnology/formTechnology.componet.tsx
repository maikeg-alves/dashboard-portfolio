import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';

import { LoadingPage } from '../loadingPage';

import { Form, StepperBox } from './styles';
import { IGithub, IProject, ITechnologys, ITechnologysCRUD } from '@interfaces';

import { _CRUD } from '../../scripts';
import { Preview } from '../PreviewCrad';

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
  statusUpdate?: (status: boolean) => void;
  stateCreate?: (status: boolean) => void;
};

const FormTechnology: React.FC<Outputs> = (props) => {
  const [step, setStep] = React.useState<number>(1); //eslint-disable-line

  const [cardData, setcardData] = React.useState<ITechnologysCRUD>();

  const [update, setupdate] = React.useState<boolean>(false);
  const [looding, setLooding] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    /*  watch, */
    formState: { errors },
  } = useForm<Inputs>();

  const CRUD = new _CRUD(Number(props.id), 'technologys');

  // script base de CRUD

  const createOrUpdateProject = async (data: ITechnologysCRUD) => {
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

  // função do formularios

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // values of form state

    const { techName, Ability, urlicon } = data;

    // converter valores em numbe

    try {
      switch (step) {
        case 1:
          const techExists = props.technologys.some(
            (tech) => tech.name === techName || tech.icon === urlicon,
          );

          if (techExists) {
            alert('error tecnologia existe');
          }

          if (Ability === 0) {
            return alert('adicione algum nivel de habilidade');
          }

          const data: ITechnologysCRUD = {
            name: techName,
            ability: Number(Ability),
            icon: urlicon.includes('https://')
              ? urlicon
              : 'https://raw.githubusercontent.com/jmnote/z-icons/master/svg/github.svg',
          };

          console.log('valores do objeto', data);

          if (data !== undefined && !techExists) {
            setcardData(data);
            setStep(2);
          }

          break;
        case 2:
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

  console.log('dados do card', cardData);

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
                    <Form.Label>Technology Name </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={`${
                        props.values &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.name)
                      }`}
                      value={
                        errors.techName &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.name)
                      }
                      {...register('techName', {
                        required: true,
                        pattern: /^[a-zA-Z]/,
                      })}
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
                        errors.techName &&
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
                        errors.techName &&
                        props.technologys
                          .filter((res) => res.id === props.id)
                          .map((res) => res.icon)
                      }
                    />
                  </Form.Group>
                </>
              ) : (
                <>
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
    </>
  );
};

export default FormTechnology;
