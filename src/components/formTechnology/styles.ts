import styled from 'styled-components';
import { Form as BTForm } from 'react-bootstrap';
import Box from '@mui/material/Box';

export const Form = styled(BTForm)`
  input[type='text'],
  input[type='number'] {
    border-radius: 13px;
    height: 50px;
    margin: 10px 0;
  }

  label {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  button {
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
  .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed {
    color: ${(props) => props.theme.colors.primary};
  }
  .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active {
    color: ${(props) => props.theme.colors.textSecondary};
  }
  .css-1hv8oq8-MuiStepLabel-label.MuiStepLabel-alternativeLabel {
    color: ${(props) => props.theme.colors.textSecondary};
  }
`;
