import * as React from 'react';
import { Modal as MUIModal } from '@mui/material';
import { Box } from './styles';
import { BsChevronDown } from 'react-icons/bs';
import { Col } from 'react-bootstrap';

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
        <Box>
          <Col xs={12} className="exit">
            <span onClick={hide}>
              <BsChevronDown />
            </span>
          </Col>
          {children}
        </Box>
      </MUIModal>
    </div>
  );
};

const useModal = () => {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const toggle = () => setIsShown(!isShown);

  return {
    isShown,
    toggle,
  };
};

export { useModal, Modal };
