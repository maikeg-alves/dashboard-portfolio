import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled(Col)`
  input[type='text'] {
    margin: 10px 0;
  }

  button {
    margin: 10px 0;
    width: 100%;
    padding: 10px 5px;
    border-radius: 12px;
    border: none !important;
    background-color: ${(props) => props.theme.table.danger};
    color: white;
    font-weight: bold;
  }

  strong {
    font-weight: bold;
    color: ${(props) => props.theme.table.danger};
  }
`;
