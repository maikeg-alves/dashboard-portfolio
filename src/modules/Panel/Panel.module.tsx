import { PanelMenu } from './styles';
import { IoMdExit } from 'react-icons/io';
import { ButtonPanel } from '../../components';
/* icons */
import { RiHomeLine } from 'react-icons/ri';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { RiFileCodeFill } from 'react-icons/ri';
import React from 'react';

type PanelProps = {
  setOpen: (open: string) => void;
};

const Panel: React.FC<PanelProps> = ({ setOpen }) => {
  const [active, setActive] = React.useState<boolean>(true);
  const [active2, setActive2] = React.useState<boolean>(false);
  const [active3, setActive3] = React.useState<boolean>(false);

  const handleActive = () => {
    setActive(!active);
    setActive2(false);
    setActive3(false);
    setOpen('Home');
  };

  const handleActive2 = () => {
    setActive2(!active2);
    setActive(false);
    setActive3(false);
    setOpen('Projects');
  };

  const handleActive3 = () => {
    setActive3(!active3);
    setActive(false);
    setActive2(false);
    setOpen('Technologys');
  };

  return (
    <PanelMenu className="m-2">
      <div className="d-flex flex-row align-items-center login">
        <div className="avatar">
          <h4></h4>
        </div>
        <div className="user">
          <h6>Maicon Gabriel Alves</h6>
          <p>admin</p>
        </div>
        <div className="m-3 logout">
          <button>
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
