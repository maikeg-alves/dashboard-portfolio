import styled from 'styled-components';
import { Col } from 'react-bootstrap';

type Props = {
  theme: {
    colors: {
      primary: string;
      text: string;
    };
  };
};

export const MYContainer = styled(Col)<Props>`
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url(${(props) => props.back});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.background};
    opacity: 0.5;
    z-index: -1;
  }
`;
