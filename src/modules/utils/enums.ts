export enum ROLE {
  ADMIN = 'admin',
  ATTENDEE = 'attendee',
}

export enum ROLE_TYPE {
  ADMIN = 'Admin',
  ATTENDEE = 'Attendee',
  SPEAKER = 'Speaker',
  TALK = 'Talk',
}

export enum ERROR_MSG {
  AUTHENTICATE_ERR = 'Please authenticate',
  ACESS_DENIED = 'Access denied',
  NOT_FOUND = 'Not found',
  INVALID_EMAIL_PASSWORD = 'Invalid email or password',
}

export enum SUCCESS_MSG {
  SUCCESS_MSG = 'User registered successfully',
}

export enum TOKEN_TYPE {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}
