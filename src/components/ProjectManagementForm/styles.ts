import styled from 'styled-components';
import { Form as BTForm } from 'react-bootstrap';
import Box from '@mui/material/Box';

export const Form = styled(BTForm)`
  input[type='text'],
  input[type='textarea'] {
    border-radius: 13px;
    height: 50px;
    margin: 10px 0;
  }

  label {
    font-size: 1rem;
    margin: 0;
  }

  button {
    color: white;
    font-weight: 500;
    background-color: #01c88c;
    border-radius: 13px;
    margin: 10px 0;
    padding: 10px 37px;
  }

  textarea {
    margin: 10px 0;
    padding: 10px 0.75rem !important;
  }
  select {
    margin: 10px 0;
  }
`;

export const StepperBox = styled(Box)`
  width: 100%;
  color: ${(props) => props.theme.colors.text};
  .Mui-completed path {
    color: ${(props) => props.theme.colors.primary}!important;
  }
  .Mui-active {
    color: ${(props) => props.theme.colors.textSecondary}!important;
  }
  .MuiStepLabel-alternativeLabel {
    color: ${(props) => props.theme.colors.textSecondary}!important;
  }
`;
