import React, { useState, useEffect } from 'react'; 
import { auth } from './firebase';
import { LayoutDashboard, BarChart3, Users, LogOut, PlusCircle } from 'lucide-react'; 
import logo from './DC logo.png';
import { getKPIHistory } from './dbService';
import KPIGraph from './components/KPIGraph';
import AddKPIModal from './components/AddKPIModal';

const Dashboard = () => {
  const handleSignOut = () => auth.signOut();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kpiData, setKpiData] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      if (auth.currentUser) {
        const datosCargados = await getKPIHistory(auth.currentUser.uid);
        setKpiData(datosCargados);
      }
    };
    cargarDatos();
  }, [auth]); 

  return (
    <div className="flex min-h-screen bg-gray-100 font-montserrat">
      {/* 1. BARRA LATERAL (Sidebar) */}
      <aside className="w-64 bg-dreams-blue text-white flex flex-col">
        <div className="p-6 border-b border-white/10 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 w-auto mb-2 brightness-0 invert" />
          <span className="text-xs font-light tracking-widest text-dreams-orange">PLATAFORMA ESTRATÉGICA</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-white/10 rounded-lg text-sm">
            <LayoutDashboard size={18} /> Panel Principal
          </button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-lg text-sm text-gray-300">
            <BarChart3 size={18} /> KPIs Lead/Lag
          </button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-white/5 rounded-lg text-sm text-gray-300">
            <Users size={18} /> Capital Humano
          </button>
        </nav>

        <button 
          onClick={handleSignOut}
          className="p-6 border-t border-white/10 flex items-center gap-3 hover:bg-red-500 transition-colors text-sm"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      {/* 2. ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-700">Bienvenido, Director</h1>
          <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-dreams-orange text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
                <PlusCircle size={18} /> REGISTRAR ACTIVIDAD
            </button>
          <div className="flex items-center gap-4 text-sm text-gray-500">
             Enfoque: <span className="text-dreams-orange font-bold italic">"Identifica hoy, Implementa hoy"</span>
          </div>
        </header>

        <section className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta de KPIs con Gráfica Real */}
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-dreams-orange md:col-span-2">
              <p className="text-xs uppercase font-bold tracking-wider mb-4 text-dreams-blue">
                Tendencia de Crecimiento (Ventas vs Metas)
              </p>
              
              <KPIGraph data={kpiData} />
              
              <p className="text-[10px] text-gray-400 italic mt-2">
                Basado en metodología Dreams: "Identifica hoy, Implementa hoy"
              </p>
            </div>
          </div>
        </section>
        
        <AddKPIModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          userId={auth.currentUser?.uid} 
        />
      </main>
    </div>
  );
};

export default Dashboard;