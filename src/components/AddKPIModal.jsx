// src/components/AddKPIModal.jsx
import React, { useState } from 'react';
import { registerKPIEntry } from '../api/dbService';
import { X, Target, TrendingUp } from 'lucide-react';

const AddKPIModal = ({ isOpen, onClose, userId }) => {
  const [value, setValue] = useState('');
  const [type, setType] = useState('lead'); // 'lead' o 'lag'
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await registerKPIEntry(userId, {
      value: Number(value),
      type,
      notes,
      title: type === 'lead' ? 'Ventas Semanales' : 'Utilidad Mensual' // Ejemplo
    });
    
    if (result.success) {
      alert("Métrica guardada. ¡Buen trabajo, Director!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border-t-8 border-dreams-orange p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dreams-blue flex items-center gap-2">
            <Target className="text-dreams-orange" /> Registrar Avance
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Tipo de Indicador</label>
            <select 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-dreams-blue"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="lead">Lead (Actividad Semanal)</option>
              <option value="lag">Lag (Resultado Mensual)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Valor Actual</label>
            <input 
              type="number" 
              required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-dreams-blue font-bold text-lg"
              placeholder="Ej: 15000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Notas de Ejecución</label>
            <textarea 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-dreams-blue"
              placeholder="¿Qué acciones clave tomaste hoy?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-dreams-blue text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            GUARDAR REGISTRO <TrendingUp size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddKPIModal;