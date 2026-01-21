import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { auth } from '../api/firebase'; 
import logo from '../assets/DC logo.png';

const Login = () => {
  // 2. Definimos las "cajas" para guardar datos (esto es el "Estado")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 3. Función que se ejecuta al intentar entrar
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');       
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("¡Acceso concedido! Bienvenido a Dreams Criteria.");
    } catch (err) {
  // Le damos un uso a 'err' imprimiéndolo en la consola (para nosotros los desarrolladores)
  console.error("Error detectado:", err); 
  
  setError("Correo o contraseña incorrectos. Verifica tus datos.");
}
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      {/* Tarjeta principal con el borde naranja corporativo */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8 border-t-4 border-dreams-orange">
        
        <div className="flex flex-col items-center text-center">
          {/* Tu logo oficial */}
          <div className="h-28 w-auto mb-4 flex items-center justify-center">
             <img src={logo} alt="Dreams Criteria Logo" className="h-full w-auto object-contain" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 font-montserrat">Bienvenido, Líder</h2>
          <p className="text-sm text-gray-500 font-montserrat">
            Ingresa a tu plataforma de gestión estratégica
          </p>
        </div>

        {/* Formulario de acceso */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input 
              type="email" 
              placeholder="Correo electrónico"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dreams-blue outline-none transition-all font-montserrat"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input 
              type="password" 
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-dreams-blue outline-none transition-all font-montserrat"
            />
          </div>

          {/* Mensaje de error si los datos son incorrectos */}
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs text-center font-montserrat border border-red-100 italic">
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-dreams-blue hover:opacity-90 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg font-montserrat cursor-pointer"
          >
            INICIAR SESIÓN
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="text-center">
          <a href="#" className="text-sm text-dreams-blue hover:underline font-montserrat">
            ¿Olvidaste tu acceso? Contacta a tu Coach
          </a>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-xs font-montserrat italic">
        © 2026 Dreams Criteria - Potenciando el Capital Humano
      </p>
    </div>
  );
};

export default Login;