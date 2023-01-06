import { PanelMenu } from './styles';
import { IoMdExit } from 'react-icons/io';
import { ButtonPanel } from '../../components';
/* icons */
import { RiHomeLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { RiFileCodeFill } from 'react-icons/ri';
import React from 'react';
import { useRouter } from 'next/router';

type PanelProps = {
  setOpen: (open: string) => void;
  admin: boolean;
};

const Panel: React.FC<PanelProps> = (props) => {
  const [active, setActive] = React.useState<boolean>(true);
  const [active2, setActive2] = React.useState<boolean>(false);
  const [active3, setActive3] = React.useState<boolean>(false);
  const router = useRouter();

  const handleActive = () => {
    setActive(!active);
    setActive2(false);
    setActive3(false);
    props.setOpen('Home');
  };

  const handleActive2 = () => {
    setActive2(!active2);
    setActive(false);
    setActive3(false);
    props.setOpen('Projects');
  };

  const handleActive3 = () => {
    setActive3(!active3);
    setActive(false);
    setActive2(false);
    props.setOpen('Technologys');
  };

  const logout = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

    router.push('/login');
  };

  return (
    <PanelMenu>
      <div className="d-flex flex-row align-items-center login">
        <div className="avatar">
          <h4></h4>
        </div>
        <div className="user">
          <h6>{props.admin ? 'Maicon Gabriel alves' : 'User '}</h6>
          <p> {props.admin ? 'admin' : 'visitante '} </p>
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
            <li>
              <ButtonPanel
                Icon={<RiHomeLine />}
                handleActive={handleActive}
                Title="Home"
                Active={active}
              />
            </li>
            <li>
              <ButtonPanel
                Icon={<AiOutlineAppstoreAdd />}
                Title="Projects"
                handleActive={handleActive2}
                Active={active2}
              />
            </li>
            <li>
              <ButtonPanel
                Icon={<RiFileCodeFill />}
                Title="Technologys"
                handleActive={handleActive3}
                Active={active3}
              />
            </li>
          </ul>
        </div>
      </div>
    </PanelMenu>
  );
};

export default Panel;
