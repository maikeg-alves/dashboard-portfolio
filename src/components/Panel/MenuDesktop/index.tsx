import React from 'react';
import { AiOutlineAppstoreAdd, AiOutlineUser } from 'react-icons/ai';
import { RiFileCodeFill, RiHomeLine } from 'react-icons/ri';
import { DesktopStyle } from './style';

interface DesktopProps {
  setOpen: (open: string) => void;
  admin: boolean;
  reduced: boolean;
}

const Desktop: React.FC<DesktopProps> = (props) => {
  React.useEffect(() => {
    const listItem = document.querySelectorAll(
      '.btndesk',
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

    return () => {
      listItem.forEach((item) => {
        item.removeEventListener('click', activateLink);
      });
    };
  }, []);

  return (
    <DesktopStyle reduced={props.reduced}>
      {!props.reduced && (
        <div className="title">
          <h4>Deshboard</h4>
        </div>
      )}
      <ul>
        <li className="btndesk active">
          <button onClick={() => props.setOpen('Home')}>
            <div>
              <RiHomeLine />
              {!props.reduced && <p>Home</p>}
            </div>
          </button>
        </li>
        <li className="btndesk">
          <button onClick={() => props.setOpen('Projects')}>
            <div>
              <AiOutlineAppstoreAdd />
              {!props.reduced && <p>Projects</p>}
            </div>
          </button>
        </li>
        <li className="btndesk">
          <button onClick={() => props.setOpen('Techs')}>
            <div>
              <RiFileCodeFill />
              {!props.reduced && <p>Technologys</p>}
            </div>
          </button>
        </li>
        <li className="btndesk">
          <button onClick={() => props.setOpen('Settings')}>
            <div>
              <AiOutlineUser />
              {!props.reduced && <p>Settings</p>}
            </div>
          </button>
        </li>
      </ul>
    </DesktopStyle>
  );
};

export default Desktop;
