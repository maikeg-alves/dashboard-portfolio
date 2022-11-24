import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Modal as MUIModal } from '@mui/material';
import { Box } from './styles';

export interface ModalProps {
  isShown: boolean;
  hide: () => void;
  children: React.ReactElement;
  headerText: string;
}

const Modal: React.FC<ModalProps> = ({
  isShown,
  headerText,
  hide,
  children,
}) => {
  return (
    <div>
      <MUIModal
        open={isShown}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {headerText}
          </Typography>
          {children}
        </Box>
      </MUIModal>
    </div>
  );
};

export default Modal;
