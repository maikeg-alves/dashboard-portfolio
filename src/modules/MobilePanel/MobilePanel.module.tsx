import * as React from 'react';
import { Container } from './styles';
import { AiOutlineUser } from 'react-icons/ai';
import { RiHomeLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { RiFileCodeFill } from 'react-icons/ri';
import { Col } from 'react-bootstrap';

type Props = {
  setOpen: (open: string) => void;
};

const MobilePanel: React.FC<Props> = (props) => {
  const handleActive = (open: string): void => {
    props.setOpen(open);
  };

  if (typeof window !== 'undefined') {
    const listItem = document.querySelectorAll(
      '.list',
    ) as NodeListOf<HTMLElement>;

    function activateLink(this: HTMLDivElement) {
      listItem.forEach((item) => {
        item.classList.remove('active');
      });

      this.classList.add('active');
    }

    listItem.forEach((item) => {
      item.addEventListener('click', activateLink);
    });
  }

  return (
    <Container sm={12}>
      <Col sm="auto" className="menumobile">
        <div className="navigation">
          <ul className="listWrap">
            <li className="list active" onClick={() => handleActive('Home')}>
              <a href="javascript:void(0);">
                <i className="icon">
                  <RiHomeLine />
                </i>
                <span className="text">Home</span>
              </a>
            </li>
            <li className="list" onClick={() => handleActive('Projects')}>
              <a href="javascript:void(0);">
                <i className="icon">
                  <AiOutlineAppstoreAdd />
                </i>
                <span className="text">Projects</span>
              </a>
            </li>
            <li className="list" onClick={() => handleActive('Techs')}>
              <a href="javascript:void(0);">
                <i className="icon">
                  <RiFileCodeFill />
                </i>
                <span className="text">Techs</span>
              </a>
            </li>

            <li className="list" onClick={() => handleActive('Settings')}>
              <a>
                <i className="icon">
                  <AiOutlineUser />
                </i>
                <span className="text">Settings</span>
              </a>
            </li>

            <li className="indicator"></li>
          </ul>
        </div>
      </Col>
    </Container>
  );
};

export default MobilePanel;
