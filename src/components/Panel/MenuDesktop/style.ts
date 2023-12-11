import styled from 'styled-components';

export const DesktopStyle = styled.div<{ reduced: boolean }>`
  .title {
    h4 {
      color: #494a4e;
      font-size: 15px;
      font-weight: 600;
      line-height: 14.52px;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    .btndesk {
      padding: ${(props) => (props.reduced ? 0 : '10px')};
      width: 100%;
      border: none;
      padding-bottom: 1rem;
      button {
        background-color: transparent;
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: none;
        display: flex;
        align-items: center;
        font-size: 19px;
        transition: 0.2s;
        div {
          display: flex;
          align-items: center;
          /*   width: 150px; */
          margin-left: 20px;
          color: #ffffff75;
          p {
            color: #ffffff75;
            margin: 0;
            margin-left: 50px;
          }
        }
      }
    }

    .active {
      button {
        background: repeating-linear-gradient(173deg, #00e36f, #01c88c);
        div {
          color: #ffffff !important;
          p {
            color: #ffffff !important;
          }
        }
      }
    }
  }
`;
