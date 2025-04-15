import passport from 'passport';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

const auth = (...roles: string[]) => {
  return [
    passport.authenticate('jwt', { session: false }),
    (req: any, _res: any, next: any) => {
      if (roles.length && !roles.includes(req.user.role)) {
        return next(new AppError(httpStatus.FORBIDDEN, 'Forbidden'));
      }
      next();
    },
  ];
};

export default auth;
