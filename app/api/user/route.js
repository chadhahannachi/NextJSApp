import User from "@models/user";
import { connectToDB } from "@/utils/database";
import { isAddressWithin50KmOfParis } from "@/utils/validateAddress";

export async function PUT(req) {
  try {
    await connectToDB();
    const { name, email, prenom, dateDeNaissance, adresse, numeroDeTelephone } = await req.json();

    console.log("Données reçues du frontend:", { email, prenom, dateDeNaissance, adresse, numeroDeTelephone });

    // Valider l'adresse
    const isValidAddress = await isAddressWithin50KmOfParis(adresse);
    if (!isValidAddress) {
      console.log("Adresse invalide");
      return new Response("L'adresse doit être située à moins de 50 km de Paris.", { status: 400 });
    }

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name,
        prenom,
        dateDeNaissance: new Date(dateDeNaissance), // Assure-toi que c'est bien une date
        adresse,
        numeroDeTelephone,
      },
      { new: true, runValidators: true } // Forcer la récupération de l'utilisateur mis à jour
    );

    console.log("Utilisateur mis à jour:", updatedUser);
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.log("Erreur lors de la mise à jour de l'utilisateur:", error);
    return new Response("Erreur interne", { status: 500 });
  }
}

export async function GET(req) {
    try {
      await connectToDB();
  
      const url = new URL(req.url);
      const email = url.searchParams.get('email');
  
      if (!email) {
        return new Response("Email est requis", { status: 400 });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return new Response("Utilisateur non trouvé", { status: 404 });
      }
  
      return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
      console.log("Erreur lors de la récupération de l'utilisateur:", error);
      return new Response("Erreur interne", { status: 500 });
    }
  }