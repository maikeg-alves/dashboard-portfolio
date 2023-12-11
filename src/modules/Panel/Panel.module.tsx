import React from 'react';
import { Col } from 'react-bootstrap';

import { Panel } from '@components';
import { IoIosArrowForward } from 'react-icons/io';
import { MenuContainer, PanelMenu, ReduceMenu } from './styles';

type PanelProps = {
  setOpen: (open: string) => void;
  admin: boolean;
};

const PanelDash: React.FC<PanelProps> = (props) => {
  const panelRef = React.useRef<HTMLDivElement>(null);

  const [reduced, setReduced] = React.useState<boolean>(false);

  const toggleWidth = () => {
    if (panelRef.current) {
      const currentWidth = panelRef.current.offsetWidth;
      const targetWidth = reduced ? '90px' : '285px';

      panelRef.current.style.width = targetWidth;

      void panelRef.current.offsetWidth;
      panelRef.current.style.width = currentWidth === 0 ? 'auto' : targetWidth;
    }
  };

  return (
    <PanelMenu xs={'auto'} ref={panelRef}>
      <MenuContainer>
        <Col xs={'auto'}>
          <Panel.UserInfo {...props} reduced={!reduced} />
          <>
            <Panel.MenuDesktop {...props} reduced={!reduced} />
          </>
        </Col>

        <ReduceMenu xs={2}>
          <button
            onClick={() => {
              setReduced(!reduced);
              toggleWidth();
            }}
          >
            <div>
              <IoIosArrowForward
                style={{
                  transform: reduced ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </div>
          </button>
        </ReduceMenu>
      </MenuContainer>
    </PanelMenu>
  );
};

export default PanelDash;
