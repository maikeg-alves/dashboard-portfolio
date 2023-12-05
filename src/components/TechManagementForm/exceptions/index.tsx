import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const TechnologyCreationSuccess = StandardExceptionAlert(
  {
    message: 'Technology created successfully',
  },
  StatusErros.SUCCESS,
);

export const TechnologyUpdateSuccess = StandardExceptionAlert(
  {
    message: 'Technology updated successfully',
  },
  StatusErros.SUCCESS,
);

export const TechnologyDeletionSuccess = StandardExceptionAlert(
  {
    message: 'Technology deleted successfully',
  },
  StatusErros.SUCCESS,
);

export const TechnologyCreationError = StandardExceptionAlert(
  {
    message: 'Error creating the technology',
  },
  StatusErros.ERROR,
);

export const TechnologyUpdateError = StandardExceptionAlert(
  {
    message: 'Error updating the technology',
  },
  StatusErros.ERROR,
);

export const TechnologyDeletionError = StandardExceptionAlert(
  {
    message: 'Error deleting the technology',
  },
  StatusErros.ERROR,
);

export const TechnologyNotFound = StandardExceptionAlert(
  {
    message: 'Technology not found',
  },
  StatusErros.ERROR,
);

export const TechnologyAuthorizationError = StandardExceptionAlert(
  {
    message: 'Unauthorized access',
  },
  StatusErros.ERROR,
);

export const TechnologyServerNotResponding = StandardExceptionAlert(
  {
    message:
      'It appears that the server is not responding for technology operations',
  },
  StatusErros.ERROR,
);

export interface IStatusCode {
  [key: number]: JSX.Element;
}

export const technologyStatusMessages: IStatusCode = {
  [StatusCodes.CREATED]: TechnologyCreationSuccess,
  [StatusCodes.OK]: TechnologyUpdateSuccess,
  [StatusCodes.NO_CONTENT]: TechnologyDeletionSuccess,
  [StatusCodes.BAD_REQUEST]: TechnologyCreationError,
  [StatusCodes.NOT_FOUND]: TechnologyNotFound,
  [StatusCodes.UNAUTHORIZED]: TechnologyAuthorizationError,
  [StatusCodes.INTERNAL_SERVER_ERROR]: TechnologyServerNotResponding,
};
