import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    ACCESS_TOKEN_SECRET: Joi.string().required().description('Access token secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    REFRESH_TOKEN_SECRET: Joi.string().required().description('Refresh token secret key'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    FRONTEND_DOMAIN: Joi.string().required().description('Frontend domain url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  server: {
    port: envVars.PORT,
  },
  client: {
    frontend_domain: envVars.FRONTEND_DOMAIN,
  },
  jwt: {
    accessTokenSecret: envVars.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: envVars.REFRESH_TOKEN_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
};

export default config;
