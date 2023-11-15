import React from 'react';
import { Alert, Snackbar } from '@mui/material';

export enum StandardExceptionReason {
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  USER_NOT_FOUND = 'UserNotFound',
  USER_UNVERIFIED = 'UserUnverified',
  USER_DISABLED = 'UserDisabled',
  INVALID_CREDENTIALS = 'InvalidCredentials',
  TOKEN_EXPIRED = 'TokenExpired',
  TOKEN_INVALID = 'TokenInvalid',
  TOKEN_USED = 'TokenUsed',
  RECAPTCHA_FAILED = 'RecaptchaFailed',
  FINGERPRINT_MISMATCH = 'FingerprintMismatch',
  UNKNOWNERROR = 'UnknownError',
  TECH_NOT_FOUND = 'TechNotFound',
  TECH_CREATION_FAILED = 'TechCreationFailed',
  TECH_UPDATE_FAILED = 'TechUpdateFailed',
  TECH_DELETION_FAILED = 'TechDeletionFailed',
  PROJECT_NOT_FOUND = 'ProjectNotFound',
  PROJECT_CREATION_FAILED = 'ProjectCreationFailed',
  PROJECT_UPDATE_FAILED = 'ProjectUpdateFailed',
  PROJECT_DELETION_FAILED = 'ProjectDeletionFailed',
  REPOSITORY_NOT_FOUND = 'RepositoryNotFoud',
  USER_ALREADY_EXISTS = 'UserAlreadyExists',
  MISSING_PARAMETERS = 'MissingParameters',
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}

export enum StatusErros {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface StandardExceptionBody {
  reason?: StandardExceptionReason | string | null;
  message: string;
}

export function StandardExceptionAlert(
  body: StandardExceptionBody,
  status: StatusErros,
) {
  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert variant="filled" severity={status} sx={{ width: '100%' }}>
        {body.message}
      </Alert>
    </Snackbar>
  );
}

export function closeAlertWithDelay(
  time: number,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
) {
  setState(true);
  setTimeout(() => {
    setState(false);
  }, time);
}

export function delayChangePage(
  time: number,
  setPage: (page: number) => void,
  valueInput: number,
): void {
  setTimeout(() => {
    setPage(valueInput);
  }, time);
}

/* export function delayChange<T = any>(
  time: number,
  setState: React.Dispatch<React.SetStateAction<T>>,
  valueInput: T,
): void {
  setTimeout(() => {
    setState(valueInput);
  }, time);
} */
