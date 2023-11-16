import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const ChangeSuccess = StandardExceptionAlert(
  {
    message: 'Password changed successfully login',
  },
  StatusErros.SUCCESS,
);

export const ChangeUnauthorired = StandardExceptionAlert(
  {
    message: 'Unauthorized change, invalid token redirecting...',
  },
  StatusErros.WARNING,
);

export const ChangeIncompatiblePasswords = StandardExceptionAlert(
  {
    message: 'Passwords are not supported',
  },
  StatusErros.ERROR,
);
export const ChangeUnavailableService = StandardExceptionAlert(
  {
    message: 'It appears that the server is not responding',
  },
  StatusErros.ERROR,
);

interface StatusMessages {
  [key: number]: JSX.Element;
}

export const statusMessages: StatusMessages = {
  [StatusCodes.CREATED]: ChangeSuccess,
  [StatusCodes.UNAUTHORIZED]: ChangeUnauthorired,
  [StatusCodes.BAD_REQUEST]: ChangeIncompatiblePasswords,
  [StatusCodes.INTERNAL_SERVER_ERROR]: ChangeUnavailableService,
};

export { StatusCodes };
