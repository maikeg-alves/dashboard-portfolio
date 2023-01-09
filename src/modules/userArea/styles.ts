import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  align-items: center;

  img {
    border-radius: 50%;
  }
  .alert {
    max-width: 400px;
    background-color: #ff9800;
    border-radius: 5px;
    p {
      font-size: 14px;
      margin-bottom: 0px;
      color: #000;
    }
  }

  .logout {
    margin: 4px 0;

    button {
      width: 250px;
      height: 50px;
      border-radius: 30px;
      padding: 4px;
      outline: none;
      border: none;
      background-color: red;
    }
  }
`;
