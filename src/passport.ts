import { Strategy, ExtractJwt } from "passport-jwt";
import { SecretKEY } from "./envSetup";
import { PassportStatic } from "passport";
import { User } from "./Models/User";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SecretKEY,
};

export const passportSetup = (passport: PassportStatic) => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.find({
                    username: jwt_payload.username,
                });
                if (user.length === 1) {
                    return done(null, user[0]);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        })
    );
};
