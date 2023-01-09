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
  padding: 0;
  overflow: hidden;
  background-image: url(${(props) => props.back});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  z-index: 1;

  .conElementes {
    width: 65%;
  }

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
  @media screen and (max-width: 995px) {
    .container {
      padding-right: 0px !important ;
      padding-left: 0px !important;
    }
    .rowct {
      padding: 10px 0 !important;
      justify-content: space-around !important;
    }

    .conElementes {
      width: 100% !important;
    }
  }

  @media screen and (max-width: 375px) {
    .flex-responsive {
      scroll-padding: 10px;
      width: 100%;
      height: 499px;
      scroll-snap-type: x mandatory;
      overflow-x: scroll;
      scroll-snap-align: start;
      padding: 0px;
    }
  }
`;
