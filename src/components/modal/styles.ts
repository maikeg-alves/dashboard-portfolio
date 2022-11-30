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
  padding: 40px;
  border-radius: 17px;
`;
