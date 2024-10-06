'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const Profile = () => {
  const { data: session } = useSession();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les informations utilisateur
    const fetchUserInfo = async () => {
      try {
        if (session?.user?.email) {
          const response = await axios.get(`/api/user?email=${session.user.email}`);
          setUserInfo(response.data);
        }
      } catch (error) {
        console.log("Erreur lors de la récupération des informations utilisateur:", error);
      }
    };

    fetchUserInfo();
  }, [session]);

  if (!userInfo) {
    return <p>Chargement des informations...</p>;
  }

  return (
    <div>
      <h1>Mon Profil</h1>
      <p><strong>Nom:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Prénom:</strong> {userInfo.prenom || 'Non défini'}</p>
      <p><strong>Date de naissance:</strong> {userInfo.dateDeNaissance ? new Date(userInfo.dateDeNaissance).toLocaleDateString() : 'Non définie'}</p>
      <p><strong>Adresse:</strong> {userInfo.adresse || 'Non définie'}</p>
      <p><strong>Numéro de téléphone:</strong> {userInfo.numeroDeTelephone || 'Non défini'}</p>
    </div>
  );
}

export default Profile;
