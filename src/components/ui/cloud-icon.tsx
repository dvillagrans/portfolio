import React, { useState, useEffect, memo } from "react";
import IconCloud from "@/components/magicui/icon-cloud";
import { DATA } from "@/data/resume";

// Utilizamos React.memo para evitar re-renderizaciones innecesarias
export const IconCloudDemo = memo(function IconCloudDemo() {
  const [skills, setSkills] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Usar useEffect para procesar habilidades solo una vez en el cliente
  useEffect(() => {
    // Procesar los skills en un useEffect para asegurar que solo se ejecute en el cliente
    const processedSkills = DATA.skills
      .map(skill => skill.toLowerCase())
      .filter(skill => skill.trim() !== ""); // Filtrar cualquier skill vacío
    
    // Establecer el estado solo si es necesario para evitar re-renders
    if (processedSkills.length > 0) {
      setSkills(processedSkills);
      setIsReady(true);
    }
    
    // Este efecto solo debe ejecutarse una vez al montar el componente
  }, []);

  // Usar un contenedor con altura fija para mantener el espacio durante la carga
  return (
    <div 
      className="relative flex h-[300px] w-full max-w-[28rem] items-center justify-center rounded-lg bg-transparent px-12 pb-4 pt-6"
      style={{ willChange: 'auto', contain: 'content' }} // Mejora el rendimiento durante el scroll
    >
      {!isReady ? (
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      ) : (
        <IconCloud iconSlugs={skills} />
      )}
    </div>
  );
});
