import Image from 'next/image';
import { LoginInfos, Logout } from './style';
import { Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { IoMdExit } from 'react-icons/io';

interface InfoUserProps {
  setOpen: (open: string) => void;
  admin: boolean;
  reduced?: boolean;
}

const InfoUser: React.FC<InfoUserProps> = (props) => {
  const router = useRouter();

  const logout = () => {
    localStorage.getItem('token') && localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <>
      <LoginInfos
        className={`d-flex flex-row align-items-center ${
          props.reduced && 'justify-content-center'
        }`}
      >
        <Col xs={'auto'} className="avatar">
          <Image
            src={`${
              props.admin
                ? 'https://i.imgur.com/p7LZCvN.png'
                : 'https://i.imgur.com/YYNLL6b.jpgs'
            }`} /* */
            alt="avatar user"
            width={40}
            height={40}
          />
        </Col>

        {!props.reduced && (
          <>
            <div className="user">
              <h6>{props.admin ? 'Maicon Gabriel alves' : 'Usuário '}</h6>
              <p> {props.admin ? 'administrador' : 'visitante '} </p>
            </div>

            <Logout className="m-3">
              <button onClick={logout}>
                <IoMdExit />
              </button>
            </Logout>
          </>
        )}
      </LoginInfos>
    </>
  );
};

export default InfoUser;
