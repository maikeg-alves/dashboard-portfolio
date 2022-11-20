import styled from 'styled-components';
import { Col, Form } from 'react-bootstrap';

export const Container = styled(Col)`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: red;
`;

export const FormGroup = styled(Form.Group)`
  position: relative;
  margin: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem !important;

  input {
    padding: 13px 20px;
    padding-left: 55px;
    width: 100%;
    height: 42px;
    font-weight: 500;
    border-radius: 10px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.5px;
    outline: none;
    color: #ffffff75;
    background-color: #2e3034;
    border: 1px solid #01c88c;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    box-shadow: 0 4px 8px 0 rgb(21 21 21 / 20%);
    color-scheme: dark;

    &:focus {
      background-color: #2e3034;
      color: #ffffff;
      border: 1px solid #01c88c;
      box-shadow: 0 4px 8px 0 rgb(21 21 21 / 20%);
    }
  }

  .icon {
    position: absolute;
    top: 0;
    left: 23px;
    height: 100%;
    color: #ffffff75;
    display: flex;
    align-items: center;
  }
`;

export const CardLogin = styled(Col)`
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  color: ${(props) => props.theme.colors.text};
  width: 100%;
  max-width: 350px;
  padding: 20px;
  margin: 20px;
  border-radius: 27px;
  h4 {
    margin-top: 20px;
  }

  .msg-secondary {
    p {
      color: ${(props) => props.theme.colors.textSecondary}!important;
    }
  }

  .visit {
    margin-top: 20px;

    p {
      a {
        color: ${(props) => props.theme.colors.primary};
        text-decoration: none;
      }
    }
  }

  button {
    margin: 10px 0 5px 0;
    border-radius: 30px;
    width: 137px;
    height: 39px;
    background: ${(props) => props.theme.colors.primary};
    border-radius: 20px;

    font-size: 11px;
    line-height: 13px;
  }

  .forgot {
    a {
      color: ${(props) => props.theme.colors.primary};
      text-decoration: none;
      font-size: 11px;
    }
  }
`;
