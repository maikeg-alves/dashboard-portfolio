import { PanelMenu } from './styles';
import { IoMdExit } from 'react-icons/io';

/* icons */
import { RiHomeLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd, AiOutlineUser } from 'react-icons/ai';
import { RiFileCodeFill } from 'react-icons/ri';
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

type PanelProps = {
  setOpen: (open: string) => void;
  admin: boolean;
};

const Panel: React.FC<PanelProps> = (props) => {
  const router = useRouter();

  const handleActive = (open: string) => {
    props.setOpen(open);
  };

  const logout = () => {
    localStorage.getItem('token') && localStorage.removeItem('token');
    router.push('/login');
  };

  if (typeof window !== 'undefined') {
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
  }

  return (
    <PanelMenu>
      <div className="d-flex flex-row align-items-center login">
        <div className="avatar">
          {/* <h4></h4> */}
          <Image
            src={`${
              props.admin
                ? ' https://i.imgur.com/p7LZCvN.png'
                : 'https://i.imgur.com/YYNLL6b.jpgs'
            }`} /* */
            alt="avatar user"
            width={55}
            height={55}
          />
        </div>
        <div className="user">
          <h6>{props.admin ? 'Maicon Gabriel alves' : 'Usuário '}</h6>
          <p> {props.admin ? 'administrador' : 'visitante '} </p>
        </div>
        <div className="m-3 logout">
          <button onClick={logout}>
            <IoMdExit />
          </button>
        </div>
      </div>

      <div className="d-flex  flex-column menu">
        <div className="title">
          <h4>Deshboard</h4>
        </div>
        <div>
          <ul>
            <li className="btndesk active">
              <button onClick={() => handleActive('Home')}>
                <div>
                  <RiHomeLine />
                  <p>Home</p>
                </div>
              </button>
            </li>
            <li className="btndesk">
              <button onClick={() => handleActive('Projects')}>
                <div>
                  <AiOutlineAppstoreAdd />
                  <p>Projects</p>
                </div>
              </button>
            </li>
            <li className="btndesk">
              <button onClick={() => handleActive('Technologys')}>
                <div>
                  <RiFileCodeFill />
                  <p>Technologys</p>
                </div>
              </button>
            </li>
            <li className="btndesk">
              <button onClick={() => handleActive('Settings')}>
                <div>
                  <AiOutlineUser />
                  <p>Settings</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </PanelMenu>
  );
};

export default Panel;
