import React from 'react';
import { CircularProgress } from '@mui/material';
import { CheckIcon, Container, Label } from './styles';
import { Col } from 'react-bootstrap';
type PropsLoading = {
  showCheck?: boolean;
};

export const LoadingPage: React.FC<PropsLoading> = ({ showCheck }) => {
  return (
    <Container>
      <Col xs={'auto'}>
        <Label htmlFor="check">
          {showCheck ? <CheckIcon completed={showCheck} /> : null}
          <CircularProgress
            variant={!showCheck ? 'indeterminate' : 'determinate'}
            value={100}
          />
        </Label>
        {/* <input type="checkbox" id="check" onChange={handleCheckboxChange} /> */}
      </Col>
    </Container>
  );
};
