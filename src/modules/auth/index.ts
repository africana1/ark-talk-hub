import * as authController from './auth.controller';
import * as auth from './auth.middleware';
import * as authService from './auth.service';
//import * as authValidation from './auth.validation';
import jwtStrategy from './passport';
import { IAuthUser } from './auth.interface';
import authRoute from './auth.route';

export { authController, auth, authService, jwtStrategy, IAuthUser, authRoute };
//export { authController, auth, authService, authValidation, jwtStrategy, IAuthUser };
