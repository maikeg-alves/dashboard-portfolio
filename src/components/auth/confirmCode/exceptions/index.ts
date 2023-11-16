import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const CodeSuccess = StandardExceptionAlert(
  {
    message: 'Code confirmed successfully',
  },
  StatusErros.SUCCESS,
);

export const CodeIncorrect = StandardExceptionAlert(
  {
    message: 'Incorrect code, check your email',
  },
  StatusErros.ERROR,
);

export const CodeUnavailableService = StandardExceptionAlert(
  {
    message: 'It appears that the server is not responding',
  },
  StatusErros.ERROR,
);

interface StatusMessages {
  [key: number]: JSX.Element;
}

export const statusMessages: StatusMessages = {
  [StatusCodes.OK]: CodeSuccess,
  [StatusCodes.UNAUTHORIZED]: CodeIncorrect,
  [StatusCodes.INTERNAL_SERVER_ERROR]: CodeUnavailableService,
};
