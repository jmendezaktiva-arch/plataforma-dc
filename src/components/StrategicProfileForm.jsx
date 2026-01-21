// src/components/StrategicAssistant.jsx
import React, { useState } from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { getStrategicAdvice } from '../api/aiService';

const StrategicAssistant = ({ profile, kpiData }) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const pedirConsejo = async () => {
    setLoading(true);
    const respuesta = await getStrategicAdvice(profile, kpiData);
    setAdvice(respuesta);
    setLoading(false);
  };

  return (
    <div className="bg-linear-to-br from-dreams-blue to-[#1a4d75] rounded-2xl p-6 text-white shadow-xl border-b-4 border-dreams-orange">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="text-dreams-orange" size={24} />
          <h3 className="font-bold text-lg uppercase tracking-wider">Dreams Gemini Assistant</h3>
        </div>
        <button 
          onClick={pedirConsejo}
          disabled={loading}
          className="bg-dreams-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? "ANALIZANDO..." : <><Sparkles size={14} /> OBTENER CONSULTORÍA</>}
        </button>
      </div>

      {advice ? (
        <div className="bg-white/10 p-4 rounded-xl border border-white/20 animate-fade-in text-sm leading-relaxed italic">
          "{advice}"
        </div>
      ) : (
        <p className="text-blue-100 text-sm italic">
          Pulsa el botón para que analice tus indicadores contra tu propósito empresarial.
        </p>
      )}
    </div>
  );
};

export default StrategicAssistant;