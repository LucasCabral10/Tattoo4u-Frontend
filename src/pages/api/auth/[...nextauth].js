// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        try {
          const response = await axios.post(
            "https://backend-4u-backend.fwhe6r.easypanel.host/users/login",
            {
              email,
              password,
            }
          );

          if (response.status === 200 && response.data) {
            const { user = {}, token } = response.data;
            if (user && user.id && user.name && user.email) {
              return { id: user.id, name: user.name, email: user.email, accessToken: token, token };
            } else {
              console.error("Dados do usuário ausentes na resposta");
              return null;
            }
          }
        } catch (error) {
          console.error("Erro ao autenticar:", error);
        }

        return null;
      },
    }),
    CredentialsProvider({
      id: "signup",
      name: "Credentials",
      credentials: {
        name: { label: "name", type: "text" },
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { name, email, password } = credentials;

        try {
          const response = await axios.post(
            "https://backend-4u-backend.fwhe6r.easypanel.host/users/",
            {
              name,
              email,
              password,
            }
          );

          if (response.status === 200 && response.data) {
            return null;
          }
        } catch (error) {
          console.error("Erro ao criar o usuário:", error);
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (user) {
        session.accessToken = token.accessToken;
        session.user = token;
      }

      return { ...session, ...token };
    },
  },
};

export default NextAuth(authOptions);
