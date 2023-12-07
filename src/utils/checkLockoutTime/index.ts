import React from 'react';

interface State {
  lockoutTime: number;
  attempts: number;
  disabled: boolean;
}

export function LockoutTime() {
  const [state, setState] = React.useState<State>({
    lockoutTime: 5,
    attempts: 0,
    disabled: false,
  });

  React.useEffect(() => {
    checkLockoutTime();
  }, [state]);

  const checkLockoutTime = () => {
    const lockoutTime = localStorage.getItem('lockoutTime');
    if (lockoutTime && Date.now() < Number(lockoutTime)) {
      setState((prevState) => ({ ...prevState, disabled: true }));
    } else {
      setState((prevState) => ({ ...prevState, disabled: false }));
      localStorage.removeItem('lockoutTime');
    }
  };
}
