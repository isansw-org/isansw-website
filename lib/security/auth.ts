import env from "../utils/env";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    secret: env.AUTH_SECRET,
    providers: [
        Credentials({

        })
    ]
}