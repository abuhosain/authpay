import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from '../config';
import { User } from '../modules/User/user.model';  

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt_access_secret as string,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
