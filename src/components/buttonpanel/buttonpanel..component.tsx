import React from 'react';
import { Container } from './styles';

type Props = {
  Active: boolean;
  Icon: React.ReactNode;
  Title: string;
  handleActive?: () => void;
};

const ButtonPanel: React.FC<Props> = ({
  Active,
  Icon,
  Title,
  handleActive,
}) => {
  const [active, setActive] = React.useState(false);

  const handleClick = () => {
    handleActive && handleActive();
  };

  React.useEffect(() => {
    setActive(Active);
  }, [Active]);

  return (
    <Container
      background={active ? `#01C88C` : 'transparent'}
      textColor={active ? `#FFFFFF` : '#FFFFFF75'}
    >
      <button onClick={handleClick}>
        <div>
          {Icon}

          <p> {Title}</p>
        </div>
      </button>
    </Container>
  );
};

export default ButtonPanel;
