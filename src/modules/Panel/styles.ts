import { Col } from 'react-bootstrap';
import styled from 'styled-components';

export const PanelMenu = styled(Col)`
  display: block;
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
    }
  }

  @media screen and (max-width: 995px) {
    display: none;
  }
`;
