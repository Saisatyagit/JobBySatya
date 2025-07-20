import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Dbconnect from "./utils/dbConnect";
import Userdata from "./utils/models/User";
export const { auth, signIn, signOut, handlers: {GET,POST} } = NextAuth({
    providers: [
        CredentialsProvider({
     name: "credentials",
     async authorize(credentials){
        await Dbconnect();

        const user = await Userdata.findOne({ 
            email: credentials?.email,
            password: credentials?.password 
         });

      if(!user){
        return null;
      }else{
       return{
        name: user.fullname,
        email: user.email,
        password: user.password,
        role: user.role,
       }
      }
        

    }
})

    ],
    secret:process.env.SECRET_KEY,
    pages:{
        signIn:"/api/Login",
    },
    callbacks:{
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        
    },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
            }
            return session;
        }
    }

})