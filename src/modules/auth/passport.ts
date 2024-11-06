import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { PrismaClient } from '@prisma/client';
import config from '../config/config';
import { ROLE, ERROR_MSG } from '../utils/enums';

const prisma = new PrismaClient();

// Configure JWT options
const opts: StrategyOptions = {
  secretOrKey: config.jwt.accessTokenSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtStrategy = new JwtStrategy(opts, async (jwtPayload, done) => {
  try {
    let user;
    // Check the role to determine which table to query
    if (jwtPayload.role === ROLE.ADMIN) {
      user = await prisma.admin.findUnique({
        where: { id: jwtPayload.sub },
      });
    } else if (jwtPayload.role === ROLE.ATTENDEE) {
      user = await prisma.attendee.findUnique({
        where: { id: jwtPayload.sub },
      });
    }

    // If no user is found or authentication fails
    if (!user) {
      return done(null, false, { message: ERROR_MSG.NOT_FOUND });
    }

    // Authentication successful
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

export default jwtStrategy;
