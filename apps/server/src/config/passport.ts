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
    async function (accessToken, refreshToken, profile, done) {
      try {
        const [user] = await db
          .insert(users)
          .values({
            googleId: profile.id,
            firstName: profile.name?.givenName ?? "",
            lastName: profile.name?.familyName ?? "",
            email: profile.emails?.[0]?.value ?? "",
            role: "buyer",
            password: null,
          })
          .onConflictDoUpdate({
            target: users.googleId,
            set: {
              firstName: profile.name?.givenName ?? "",
              lastName: profile.name?.familyName ?? "",
              email: profile.emails?.[0]?.value ?? "",
            },
          })
          .returning();

        return done(null, user);
      } catch (err) {
        return done(null, false);
      }
    }
  ),
);

/* store user ID in session */
passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

/* retrieve user from database using the ID in session */
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
