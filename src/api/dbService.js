// src/dbService.js
import { db } from './firebase';
import { 
  collection, addDoc, serverTimestamp, query, orderBy, 
  getDocs, doc, getDoc, setDoc 
} from 'firebase/firestore';

// Función para registrar una nueva entrada de KPI
export const registerKPIEntry = async (userId, kpiData) => {
  try {
    // 1. Creamos la referencia a la colección de historial de este usuario
    const historyRef = collection(db, 'users', userId, 'kpi_history');
    
    // 2. Guardamos el dato
    await addDoc(historyRef, {
      ...kpiData,
      date: serverTimestamp(),
      createdAt: serverTimestamp()
    });

    console.log("¡Dato registrado con éxito en el ecosistema Dreams!");
    return { success: true };
  } catch (error) {
    console.error("Error al registrar KPI:", error);
    return { success: false, error };
  }
};

export const getKPIHistory = async (userId) => {
  try {
    const historyRef = collection(db, 'users', userId, 'kpi_history');
    const q = query(historyRef, orderBy('date', 'asc')); 
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      formattedDate: doc.data().date?.toDate().toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit' })
    }));
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return [];
  }
};

// Guardar o actualizar el perfil estratégico (Círculo Dorado / Identidad)
export const saveUserProfile = async (userId, profileData) => {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'strategic');
    await setDoc(profileRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error al guardar perfil:", error);
    return { success: false };
  }
};

// Obtener el perfil estratégico
export const getUserProfile = async (userId) => {
  try {
    const profileRef = doc(db, 'users', userId, 'profile', 'strategic');
    const docSnap = await getDoc(profileRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return null;
  }
};