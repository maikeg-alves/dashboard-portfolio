import * as React from 'react';
import { Container } from './styles';
import { /* AiOutlineMenu */ AiOutlineUser } from 'react-icons/ai';
import { RiHomeLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { RiFileCodeFill } from 'react-icons/ri';
type Props = {
  values?: string;
};

const MobilePanel: React.FC<Props> = () => {
  /*   const listItem = document.querySelectorAll('.list');

  function activateLink() {
    listItem.forEach((item) => {
      item.classList.remove('active');
    });
    this.classList.add('active');
  }

  listItem.forEach((item) => {
    item.addEventListener('click', activateLink);
  }); */

  /*  const listItem: NodeListOf<Element> = document.querySelectorAll('.list');

  function activateLink(this: HTMLDivElement): void {
    if (listItem !== undefined) {
      listItem.forEach((item) => {
        item.classList.remove('active');
      });
      this.classList.add('active');
    }
  }

  listItem.forEach((item) => {
    item.addEventListener('click', activateLink);
  }); */

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
    <Container xs="auto">
      <div className="navigation">
        <ul className="listWrap">
          <li className="list active">
            <a href="javascript:void(0);">
              <i className="icon">
                <RiHomeLine />
              </i>
              <span className="text">Home</span>
            </a>
          </li>
          <li className="list">
            <a href="javascript:void(0);">
              <i className="icon">
                <RiHomeLine />
              </i>
              <span className="text">About</span>
            </a>
          </li>
          <li className="list">
            <a href="javascript:void(0);">
              <i className="icon">
                <RiHomeLine />
              </i>
              <span className="text">Profile</span>
            </a>
          </li>
          <li className="list">
            <a href="javascript:void(0);">
              <i className="icon">
                <RiHomeLine />
              </i>
              <span className="text">Settings</span>
            </a>
          </li>
          <li className="indicator"></li>
        </ul>
      </div>
    </Container>
  );
};

export default MobilePanel;
