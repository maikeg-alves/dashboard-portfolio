import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .css-18lrjg1-MuiCircularProgress-root {
    color: ${(props) => props.theme.colors.primary};
  }
`;
