import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const LoginSuccess = StandardExceptionAlert(
  {
    message: 'Login successful',
  },
  StatusErros.SUCCESS,
);

export const InvalidCredentials = StandardExceptionAlert(
  {
    message: 'Invalid username or password',
  },
  StatusErros.ERROR,
);

export const LoginUnavailableService = StandardExceptionAlert(
  {
    message: 'Account is locked. Please contact support.',
  },
  StatusErros.ERROR,
);

export const LoginFailed = StandardExceptionAlert(
  {
    message: 'Login failed. Please try again later.',
  },
  StatusErros.ERROR,
);

interface StatusMessages {
  [key: number]: JSX.Element;
}

export const statusMessages: StatusMessages = {
  [StatusCodes.CREATED]: LoginSuccess,
  [StatusCodes.UNAUTHORIZED]: InvalidCredentials,
  [StatusCodes.NOT_FOUND]: InvalidCredentials,
  [StatusCodes.INTERNAL_SERVER_ERROR]: LoginUnavailableService,
};

export { StatusCodes };
