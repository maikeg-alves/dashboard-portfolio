import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Dash = styled(Col)`
  width: 100%;
  height: 100%;

  .modalgrid {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
    color: #000;
    width: 200px;
    margin: 10px;
  }

  .Projects,
  .Technologys,
  .Visitors {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100px;
    h4,
    h2,
    h6 {
      color: #000;
    }

    div {
      text-align: center;
    }

    h2 {
      margin-top: 10px;
    }
  }
`;
