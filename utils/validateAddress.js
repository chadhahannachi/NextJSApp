// C:\Users\user\Desktop\anothertry\Next-App-ChadhaHannachi\utils\validateAddress.js
import axios from "axios";

const parisCoordinates = { lat: 48.8566, lon: 2.3522 }; // Coordonnées de Paris

export const isAddressWithin50KmOfParis = async (address) => {
  try {
    const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}`);
    if (response.data.features.length === 0) {
      return false; // Adresse non trouvée
    }

    const userCoordinates = response.data.features[0].geometry.coordinates;
    const [lon, lat] = userCoordinates;

    // Calcul de la distance en km entre les coordonnées
    const distance = getDistanceFromLatLonInKm(lat, lon, parisCoordinates.lat, parisCoordinates.lon);
    return distance <= 50;
  } catch (error) {
    console.log("Erreur lors de la vérification de l'adresse:", error);
    return false;
  }
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Rayon de la Terre en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance en km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
