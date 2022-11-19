import styled from 'styled-components';
import { Container } from 'react-bootstrap';

type Props = {
  theme: {
    colors: {
      primary: string;
    };
  };
};

export const MYContainer = styled(Container)<Props>`
  min-height: 100vh;
  /*   padding: 4rem 0; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  h5 {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  h6 {
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  a {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  button {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  input {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  textarea {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  select {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  label {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
