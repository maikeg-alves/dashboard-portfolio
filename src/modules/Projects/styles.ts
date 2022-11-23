import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const Project = styled(Col)`
  .add {
    .modalgrid {
      background-color: ${(props) => props.theme.colors.backgroundSecondary};
      border-radius: 17px;
      padding: 20px;
      width: 100%;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-icon {
        font-size: 80px;
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
    }
  }
`;
