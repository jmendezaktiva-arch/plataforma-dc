import React, { useState, useEffect } from 'react';
import { auth } from './api/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escucha si el usuario está logueado o no
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Mientras Firebase verifica la sesión, mostramos pantalla en blanco o carga
  if (loading) return <div className="min-h-screen flex items-center justify-center font-montserrat">Cargando Dreams Platform...</div>;

  // SI hay usuario, muestra Dashboard. SI NO, muestra Login.
  return (
    <>
      {user ? <Dashboard /> : <Login />}
    </>
  );
}

export default App;