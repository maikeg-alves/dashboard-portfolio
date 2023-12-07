import { ErrorContainer } from './style';

export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <ErrorContainer>
    <p>{message}</p>
  </ErrorContainer>
);
