import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const DeletionSuccess = StandardExceptionAlert(
  {
    message: 'Item deleted successfully',
  },
  StatusErros.SUCCESS,
);

export const DeletionError = StandardExceptionAlert(
  {
    message: 'Error deleting the ',
  },
  StatusErros.ERROR,
);

export const NotFound = StandardExceptionAlert(
  {
    message: 'Item not found',
  },
  StatusErros.ERROR,
);

export const AuthorizationError = StandardExceptionAlert(
  {
    message: 'Unauthorized access.',
  },
  StatusErros.ERROR,
);

export const ServerNotResponding = StandardExceptionAlert(
  {
    message: 'It appears that the server is not responding',
  },
  StatusErros.ERROR,
);

export interface IStatusCode {
  [key: number]: JSX.Element;
}

export const statusMessages: IStatusCode = {
  /*   [StatusCodes.CREATED]: CreationSuccess,
  [StatusCodes.OK]: UpdateSuccess, */
  [StatusCodes.CREATED]: DeletionSuccess,
  /*   [StatusCodes.BAD_REQUEST]: ProjectCreationError, */
  [StatusCodes.NOT_FOUND]: NotFound,
  [StatusCodes.UNAUTHORIZED]: AuthorizationError,
  [StatusCodes.INTERNAL_SERVER_ERROR]: ServerNotResponding,
  // Adicionando mensagem específica para o código de status de exclusão
  /*   [StatusCodes.NO_CONTENT]: ProjectDeletionSuccess, */
};
