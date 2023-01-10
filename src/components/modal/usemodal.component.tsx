import React from 'react';

const useModal = () => {
  const [isShown, setIsShown] = React.useState<boolean>(false);
  const toggle = () => setIsShown(!isShown);

  return {
    isShown,
    toggle,
  };
};

export default useModal;
