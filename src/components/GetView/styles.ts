import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Container = styled(Col)`
  table {
    margin-bottom: 0px;
  }
  .exit {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
    span {
      font-weight: bold;
      font-size: 20px;
      transform: rotate(90deg);
      margin: 0 10px;
      color: ${(props) => props.theme.table.danger};
      cursor: pointer;
    }
  }
`;
