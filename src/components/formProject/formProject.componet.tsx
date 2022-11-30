import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Col } from 'react-bootstrap';
import { Form, StepperBox } from './styles';

const steps = [
  'name, Github, description',
  'image url, technologies',
  'preview ',
];

const FormProject = () => {
  const [step, setStep] = React.useState(1);

  return (
    <>
      <Col xs={12}>
        <Form>
          {step === 1 && (
            <>
              <Form.Group>
                <Form.Label>Project name</Form.Label>
                <Form.Control type="text" placeholder="Project Name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Github repo</Form.Label>
                <Form.Control type="text" placeholder="Github Repo" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Descriotion</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '100px' }}
                />
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group>
                <Form.Label>Image url</Form.Label>
                <Form.Control type="text" placeholder="image url" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tecnologi</Form.Label>
                <Form.Select aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
                <Form.Select aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
