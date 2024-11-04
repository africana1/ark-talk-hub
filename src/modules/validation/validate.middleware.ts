import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StatusCodes as httpStatus } from 'http-status-codes';
import pick from '../utils/pick';
import ApiError from '../errors/ApiError';

const validate =
  (schema: Record<string, unknown>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    // Pick only `params`, `query`, and `body` schemas from the provided schema
    const validSchema = pick(schema, ['params', 'query', 'body']);

    // Pick only the corresponding data from the request
    const object = pick(req, Object.keys(validSchema));

    // Compile and validate the schema with Joi
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    // If validation fails, create a custom error and pass it to next()
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    // Merge the validated values back into the request
    Object.assign(req, value);
    return next();
  };

export default validate;
