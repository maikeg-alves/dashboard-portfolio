import React from 'react';
import { LoadingPage } from 'src/components/loadingPage';

interface StepTheeProps {
  success?: boolean;
}

export const StepThee: React.FC<StepTheeProps> = ({ success }) => {
  return <>{success ? <LoadingPage showCheck /> : <LoadingPage />}</>;
};
