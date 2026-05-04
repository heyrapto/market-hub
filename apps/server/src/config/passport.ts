import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { users } from "./db/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { env } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.CALLBACK_URL,
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any,
    ) {
      try {
        // 1. Insert or Update (Upsert)
        // Note: .returning() is required to get the user object back
        const [user] = await db
          .insert(users)
          .values({
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
          })
          .onConflictDoUpdate({
            target: users.googleId,
            set: {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
          })
          .returning();

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

/* Store user ID in session */
passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

/* Retrieve user from database using the ID in session */
passport.deserializeUser(async function (id: string, done) {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    done(null, user || null);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
