import styled from 'styled-components';

import { Box as MUIBox } from '@mui/material';

export const Box = styled(MUIBox)`
  position: absolute;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: ${(props) => props.theme.colors.backgroundSecondary};
  box-shadow: 24px;
  padding: 1rem;
  border-radius: 17px;

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

  @media screen and (max-width: 426px) {
    width: 90%;
    padding: 20px;
  }
`;
