import { CircularProgress } from '@mui/material';
import { Container } from './styles';

export const LoadingPage: React.FC = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};
