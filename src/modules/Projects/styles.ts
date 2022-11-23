import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Project = styled(Col)`
  .modalgrid {
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    border-radius: 17px;

    width: 100%;
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    .add-icon,
    .add-plus {
      font-size: 80px;
      padding: 20px;
      background: transparent;
      border: none;
      color: ${(props) => props.theme.colors.primary};
      svg {
        margin-bottom: 10px;
      }
      &:hover {
        cursor: pointer;
      }
    }

    .add-plus {
      padding: 10px;
      font-size: 20px;
      color: ${(props) => props.theme.colors.text};
      svg {
        margin: 0;
      }
    }
  }
`;
