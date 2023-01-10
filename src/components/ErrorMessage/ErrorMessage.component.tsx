import { Alert, Modal } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Container } from './styles';

type Props = {
  message: string;
  duration?: number;
  alert?: 'error' | 'warning' | 'success' | 'info';
};

const ErrorMessage: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(true);

  const duration: number = props.duration ? props.duration : 3000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);

  if (!visible) {
    return null;
  }

  return (
    <Container>
      <Modal
        open={visible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center align-items-center"
      >
        <Alert
          variant="filled"
          severity={props.alert ? props.alert : 'error'}
          style={{ width: '50%' }}
        >
          {props.message}
        </Alert>
      </Modal>
    </Container>
  );
};

export default ErrorMessage;
