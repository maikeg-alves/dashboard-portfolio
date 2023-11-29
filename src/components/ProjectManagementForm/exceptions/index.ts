import { StandardExceptionAlert } from '@utils';
import { StatusErros, StatusCodes } from 'src/utils/StandardExeceptionAlert';

export const ProjectCreationSuccess = StandardExceptionAlert(
  {
    message: 'Project created successfully',
  },
  StatusErros.SUCCESS,
);

export const ProjectUpdateSuccess = StandardExceptionAlert(
  {
    message: 'Project updated successfully',
  },
  StatusErros.SUCCESS,
);

export const ProjectDeletionSuccess = StandardExceptionAlert(
  {
    message: 'Project deleted successfully',
  },
  StatusErros.SUCCESS,
);

export const ProjectCreationError = StandardExceptionAlert(
  {
    message: 'Error creating the project',
  },
  StatusErros.ERROR,
);

export const ProjectUpdateError = StandardExceptionAlert(
  {
    message: 'Error updating the project',
  },
  StatusErros.ERROR,
);

export const ProjectDeletionError = StandardExceptionAlert(
  {
    message: 'Error deleting the project',
  },
  StatusErros.ERROR,
);

export const ProjectNotFound = StandardExceptionAlert(
  {
    message: 'Project not found',
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
  [StatusCodes.CREATED]: ProjectCreationSuccess,
  [StatusCodes.OK]: ProjectUpdateSuccess,
  [StatusCodes.NO_CONTENT]: ProjectDeletionSuccess,
  [StatusCodes.BAD_REQUEST]: ProjectCreationError,
  [StatusCodes.NOT_FOUND]: ProjectNotFound,
  [StatusCodes.UNAUTHORIZED]: AuthorizationError,
  [StatusCodes.INTERNAL_SERVER_ERROR]: ServerNotResponding,
};
