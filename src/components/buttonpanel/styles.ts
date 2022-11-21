import styled from 'styled-components';

type Props = {
  background: string;
  textColor: string;
};

export const Container = styled.div<Props>`
  padding: 10px;
  button {
    background-color: ${(props) => props.background};
    width: 100%;
    height: 50px;
    border-radius: 10px;
    border: none;
    display: flex;
    align-items: center;
    font-size: 15px;
    transition: 0.2s;
    div {
      display: flex;
      align-items: center;
      /*   width: 150px; */
      margin-left: 20px;
      color: ${(props) => props.textColor};
      p {
        color: ${(props) => props.textColor};
        margin: 0;
        margin-left: 50px;
      }
    }
  }
`;
