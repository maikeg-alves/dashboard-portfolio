import * as React from 'react';
import { Modal as MUIModal } from '@mui/material';
import { Box } from './styles';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  children: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ isShown, hide, children }) => {
  return (
    <div>
      <MUIModal
        open={isShown}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>{children}</Box>
      </MUIModal>
    </div>
  );
};

export default Modal;
