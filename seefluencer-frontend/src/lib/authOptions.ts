// lib/authOptions.ts (or anywhere outside the route file)
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, account, profile }) {
			if (account && profile) {
				token.accessToken = account.access_token;
				token.id = profile.sub;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
};
