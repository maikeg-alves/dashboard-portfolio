import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
export const Dash = styled(Col)`
  width: 100%;
  height: 100%;

  .modalgrid {
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    border-radius: 17px;
    padding: 20px;
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
    h6 {
      color: ${(props) => props.theme.colors.text};
    }

    h2 {
      color: ${(props) => props.theme.colors.textSecondary};
    }

    div {
      text-align: center;
    }

    h2 {
      margin-top: 10px;
    }
  }

  .RankingTech,
  .RankingLangue {
    text-align: center;
    h4 {
      margin-bottom: 20px;
    }
  }

  .progress-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    p {
      margin: 0;
      margin-right: 10px;
      color: ${(props) => props.theme.colors.textSecondary};
    }

    span {
      margin: 0;
      width: 72%;
    }
  }

  .status {
    text-align: center;
    justify-content: space-between;
    h3 {
      margin: 20px 0;
    }
    button {
      background-color: transparent;
      border: 0;
      svg {
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  .Experience {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .percentage {
      display: inline-flex;
      position: relative;
      margin-bottom: 20px;
      span {
        margin: 0 auto;
      }
      .progress-text {
        top: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    span {
      color: ${(props) => props.theme.colors.primary};
      width: 60px !important;
      height: 60px !important;
      margin: 0;
      margin-bottom: 10px;
    }
  }
`;

export const ProgressBar = styled(LinearProgress)`
  height: 15px !important;
  border-radius: 10px;
  background-color: #494a4e !important;
  .css-5xe99f-MuiLinearProgress-bar1 {
    background-color: ${(props) => props.theme.colors.primary}!important;
  }
  span {
    border-radius: 10px;
  }
`;

export const CircleProgress = styled(CircularProgress)``;
