import styled from 'styled-components';

export const Container = styled.div`
  .subtext {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    color: rgb(142, 142, 142);
    text-transform: none;
    text-align: start;
  }

  .preview-img {
    .img {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: auto;
      img {
        border: 3px solid ${(props) => props.theme.colors.primary};
        border-radius: 7px;
      }
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    padding: 0px;
    margin: 10px 0;
    li {
      border-radius: 7px;
      background-color: ${(props) => props.theme.colors.primary};
      padding: 10px 50px;
      cursor: pointer;
    }
  }
`;
