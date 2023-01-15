import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const PanelMenu = styled(Col)`
  display: block;
  visibility: visible;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  width: 318px;
  height: 100%;
  border-radius: 12px;
  padding: 10px;
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;

    .avatar {
      width: 100px;
      height: 50px;
      background-color: ${({ theme }) => theme.colors.primary};
      border-radius: 50%;
      margin-right: 10px;
      img {
        border-radius: 50%;
      }
    }

    .logout {
      button {
        width: 45px;
        height: 45px;
        border-radius: 12%;
        background-color: #494a4e;
        border: none;
        svg {
          color: red;
          font-size: 30px;
        }
      }
    }

    .user {
      position: relative;
      width: 100%;
      margin: 10px 0;
      h6,
      p {
        margin-bottom: 3px;
      }

      p {
        color: ${({ theme }) => theme.colors.textSecondary};
      }
    }
  }

  .menu {
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
        padding: 10px;
        width: 100%;
        border: none;
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
    }
  }

  .active {
    button {
      background-color: #01c88c !important;
      div {
        color: #ffffff !important;
        p {
          color: #ffffff !important;
        }
      }
    }
  }

  @media screen and (max-width: 995px) {
    display: none;
    visibility: hidden;
  }
`;
