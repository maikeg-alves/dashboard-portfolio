import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const RecoverySuccess = StandardExceptionAlert(
  {
    message: 'Recovery email sent successfully',
  },
  StatusErros.SUCCESS,
);

export const RecoveryExisting = StandardExceptionAlert(
  {
    message: 'Recovery already requested for this email',
  },
  StatusErros.WARNING,
);

export const RecoveryNotFoud = StandardExceptionAlert(
  {
    message: 'Email not found in the database',
  },
  StatusErros.ERROR,
);

export const RecoveryUnavailableService = StandardExceptionAlert(
  {
    message: 'It appears that the server is not responding',
  },
  StatusErros.ERROR,
);

interface StatusMessages {
  [key: number]: JSX.Element;
}

export const statusMessages: StatusMessages = {
  [StatusCodes.CREATED]: RecoverySuccess,
  [StatusCodes.BAD_REQUEST]: RecoveryExisting,
  [StatusCodes.NOT_FOUND]: RecoveryNotFoud,
  [StatusCodes.INTERNAL_SERVER_ERROR]: RecoveryUnavailableService,
};
