import React, { useState, useEffect } from 'react'; 
import { LayoutDashboard, BarChart3, Users, LogOut, PlusCircle } from 'lucide-react'; 
import { auth } from '../api/firebase';
import logo from '../assets/DC logo.png';
import { getKPIHistory, getUserProfile } from '../api/dbService';
import KPIGraph from '../components/KPIGraph';
import AddKPIModal from '../components/AddKPIModal';
import StrategicAssistant from '../components/StrategicProfileForm';

const Dashboard = () => {
  const handleSignOut = () => auth.signOut();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 2. ESTADOS INICIALIZADOS CORRECTAMENTE
  const [profile, setProfile] = useState(null);
  const [kpiData, setKpiData] = useState({ leads: [], lags: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarTodo = async () => {
      if (auth.currentUser) {
        try {
          const [datosKpis, datosPerfil] = await Promise.all([
            getKPIHistory(auth.currentUser.uid),
            getUserProfile(auth.currentUser.uid)
          ]);
          
          // Separamos los datos para las gráficas
          const leads = datosKpis.filter(k => k.type === 'lead');
          const lags = datosKpis.filter(k => k.type === 'lag');
          
          setKpiData({ leads, lags });
          setProfile(datosPerfil);
        } catch (error) {
          console.error("Error cargando dashboard:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    cargarTodo();
  }, []); 

  if (loading) return <div className="p-10 text-center font-montserrat">Cargando visión estratégica...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100 font-montserrat">
      {/* BARRA LATERAL */}
      <aside className="w-64 bg-dreams-blue text-white flex flex-col fixed h-full">
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
          className="p-6 border-t border-white/10 flex items-center gap-3 hover:bg-red-500 transition-colors text-sm mt-auto"
        >
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </aside>

      {/* ÁREA DE CONTENIDO (Con margen izquierdo para la sidebar fixed) */}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-gray-700">
            {profile ? `Dashboard: ${profile.companyName}` : "Bienvenido, Director"}
          </h1>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-dreams-orange text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
                <PlusCircle size={18} /> REGISTRAR ACTIVIDAD
            </button>
          </div>
        </header>

        <main className="p-8">
          {!profile ? (
            /* PASO 1: Captura de ADN Empresarial */
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg text-dreams-blue text-sm italic border-l-4 border-dreams-blue">
                "Para medir el éxito, primero debemos definir qué es el éxito para tu empresa."
              </div>
              <StrategicProfileForm 
                userId={auth.currentUser.uid} 
                onSave={() => window.location.reload()} 
              />
            </div>
          ) : (
            /* PASO 2: Dashboard Operativo */
            <div className="space-y-8">
              <StrategicAssistant profile={profile} kpiData={kpiData} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-8">
                </div>
                {/* Gráfica de Esfuerzo (Leads) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-dreams-blue">
                  <p className="text-xs uppercase font-bold tracking-wider mb-4 text-dreams-blue">
                    Indicadores de Esfuerzo (Lead)
                  </p>
                  <KPIGraph data={kpiData.leads} type="lead" />
                </div>

                {/* Gráfica de Resultados (Lags) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-dreams-orange">
                  <p className="text-xs uppercase font-bold tracking-wider mb-4 text-dreams-orange">
                    Resultados de Negocio (Lag)
                  </p>
                  <KPIGraph data={kpiData.lags} type="lag" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-4">Enfoque Estratégico</h3>
                <p className="text-gray-600 italic">"{profile.purpose}"</p>
              </div>
            </div>
          )}
        </main>
        
        <AddKPIModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          userId={auth.currentUser?.uid} 
        />
      </div>
    </div>
  );
};

export default Dashboard;