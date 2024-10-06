import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"

// import user from "@/models/user";
import User from "@models/user";
import { ConnectToDB } from "@/utils/database";
import { isAddressWithin50KmOfParis } from "@/utils/validateAddress";


const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                  redirect_uri: 'https://https://next-js-ofelyqhbf-chadha-hannachis-projects.vercel.app/api/auth/callback/google'
                }
              },
        })
    ],
    callbacks:{
        async session({session}){
            return session
        },

        async signIn({ account, profile, user, credentials }) {
            try {
              await ConnectToDB();
              const checkEmail = await User.findOne({ email: user.email });
      
              // Si l'utilisateur n'existe pas, créer un nouveau profil
              if (!checkEmail) {
                // Exemple d'adresse pour la validation (à ajuster avec les informations réelles)
                const adresse = "12 Rue de Rivoli, Paris"; 
      
                const isValidAddress = await isAddressWithin50KmOfParis(adresse);
                if (!isValidAddress) {
                  throw new Error("L'adresse doit être située à moins de 50 km de Paris.");
                }
      
                await User.create({
                  name: user.name,
                  email: user.email,
                  prenom: "", // A mettre à jour avec la valeur appropriée
                  dateDeNaissance: new Date(), // A remplacer avec la vraie date
                  adresse: adresse,
                  numeroDeTelephone: "" // A ajouter selon la demande utilisateur
                  
                });
              }
      
              return true;
            } catch (error) {
              console.log("Erreur lors de l'inscription:", error);
              return false;
            }
          }

    }
})

export {handler as GET, handler as POST}