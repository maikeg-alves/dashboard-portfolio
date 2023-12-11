import styled from 'styled-components';

export const LoginInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;

  .avatar {
    border-radius: 50%;
    margin: 10px;
    border: 3px solid ${({ theme }) => theme.colors.primary};
    img {
      border-radius: 50%;
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
`;

export const Logout = styled.div`
  button {
    width: 40px;
    height: 40px;
    border-radius: 12%;
    background-color: #494a4e;
    border: none;
    svg {
      color: red;
      font-size: 30px;
    }
  }
`;
