import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "./models/userSchema";
import { connectMongoDB } from "./libs/mongodb";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectMongoDB();
                    const user = User.hydrate(await User.findOne({ username: credentials.username }).lean());

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password,
                        );

                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.username,
                            };
                        } else {
                            console.log("Username or Password is not correct");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (error) {
                    console.log("An error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
});