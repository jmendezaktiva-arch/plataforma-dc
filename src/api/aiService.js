// src/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const getStrategicAdvice = async (profile, kpiData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construimos el "Prompt Maestro" con la metodología Dreams
    const prompt = `
        Eres el "Dreams Strategic Partner", un consultor de negocios de alto nivel experto en la metodología Dreams, EOS (Gino Wickman) y el Círculo Dorado (Simon Sinek). 
        Tu estilo es directo, desafiante, uncomfortably honest y altamente orientado a resultados. No pierdas tiempo en cortesías innecesarias.

        ADN ESTRATÉGICO:
        - Propósito (El POR QUÉ): ${profile.purpose}
        - Misión (El QUÉ): ${profile.mission}
        - Visión (A dónde): ${profile.vision}

        RADIOGRAFÍA OPERATIVA ACTUAL:
        - Indicadores de Esfuerzo (Leads/Input): ${JSON.stringify(kpiData.leads.map(k => k.value))}
        - Resultados de Negocio (Lags/Output): ${JSON.stringify(kpiData.lags.map(k => k.value))}

        TU MISIÓN:
        1. ANALIZAR LA BRECHA: ¿Los esfuerzos (Leads) están realmente alimentando el Propósito o es solo "trabajo por trabajar"?
        2. DETECTAR INCOHERENCIAS: Si los Leads son altos pero los Lags no suben, cuestiona la eficiencia. Si los Leads son bajos, cuestiona la disciplina.
        3. IDENTIFICA HOY, IMPLEMENTA HOY: Da una instrucción brutalmente clara y accionable para las próximas 24 horas. 

        REGLAS DE ORO:
        - Usa terminología de EOS (Rocas, Accountability, LMA).
        - Si los datos son mediocres, dilo. Si hay progreso, exige más.
        - Termina siempre con la frase: "Identifica hoy, Implementa hoy".
        - Máximo 120 palabras. Sé conciso y potente.
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error con Gemini:", error);
    return "Lo siento, Director, mi conexión estratégica está fallando. Intenta de nuevo en un momento.";
  }
};