import axios from 'axios';
import GoogleProvider from 'next-auth/providers/google';
import Cookies from "js-cookie";

const GOOGLE_AUTH_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID;
const GOOGLE_AUTH_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: GOOGLE_AUTH_CLIENT_ID ?? '',
      clientSecret: GOOGLE_AUTH_CLIENT_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {

    async signIn({ account }: any) {
      const googleToken = account?.id_token; 
      
      try {
        
        const response = await axios.post(`${API_URL}/auth/validate-google-token`,{ token: googleToken } ,{
        });
    
        
        if (!response) {
          console.error('Error al validar el token con el backend');
          return false;  // no se inicia sesión
        }

        await response.data;

        return true;  // se inicia sesión 
      } catch (error) {

        console.error('Error during token validation:', error);

        return false; 
      }
    },

    async jwt({ token, account, user }: any) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.role = user.role || []; 
      }
      return token;
    },

    async session({ session, token }: any) {
      const userRole = token.role || session.user?.role || [];
    
      session.accessToken = token.accessToken;
      session.user = {
        email: session.user?.email || "",
        name: session.user?.name || "",
        role: userRole,
      };
    
      Cookies.set("token", token.accessToken, { expires: 1 });
      Cookies.set(
        "user",
        JSON.stringify({
          email: session.user?.email,
          name: session.user?.name,
          role: userRole, 
        }),
        { expires: 1 }
      );
    
      return session;
    },
    

    async redirect({ baseUrl }: any) {
      // después del login, se redirige a la página principal
      return `${baseUrl}/`; 
    },

    // async signIn() {

    //   return true; // Permite el inicio de sesión
    // },

  },
  debug: true,  // Habilitar depuración para obtener más detalles
};

export default authOptions
