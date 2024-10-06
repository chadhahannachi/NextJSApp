'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter(); // Initialisation du router

  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState({
    prenom: '',
    dateDeNaissance: '',
    adresse: '',
    numeroDeTelephone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Données envoyées:", userInfo);
      const response = await axios.put('/api/user', userInfo);
      console.log("Mise à jour réussie:", response.data);
      alert("Vos informations ont été modifiées avec succès !");

    } catch (error) {
      console.log("Erreur lors de la mise à jour:", error);
    }
  };
  
  const goToProfile = () => {
    router.push('/homePage/profile'); // Rediriger vers la page profile
  };

  return (
    <div>
      <h1>Modifier mes informations</h1>
      <form onSubmit={handleSubmit}>

      <label>nom:</label>
        <input
          
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />

      <label>email:</label>
        <input
          
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />

        <label>Prénom:</label>
        <input
          type="text"
          value={userInfo.prenom}
          onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })}
        />

        <label>Date de naissance:</label>
        <input
          type="date"
          value={userInfo.dateDeNaissance}
          onChange={(e) => setUserInfo({ ...userInfo, dateDeNaissance: e.target.value })}
        />

        <label>Adresse:</label>
        <input
          type="text"
          value={userInfo.adresse}
          onChange={(e) => setUserInfo({ ...userInfo, adresse: e.target.value })}
        />

        <label>Numéro de téléphone:</label>
        <input
          type="text"
          value={userInfo.numeroDeTelephone}
          onChange={(e) => setUserInfo({ ...userInfo, numeroDeTelephone: e.target.value })}
        />

        <button type="submit">Mettre à jour mes informations</button>
      </form>

      <button onClick={goToProfile}>aller à mon profil</button>
    </div>
  );
}

export default Page
