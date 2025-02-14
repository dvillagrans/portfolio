import { useState, useMemo } from 'react';
import { DATA } from '@/data/resume';

// Actualizar la interfaz para que coincida con la estructura de tus proyectos
interface Project {
    title: string;
    description: string;
    dates: string;
    technologies: string[];
    href?: string;
    active: boolean;
    image?: {
        src: string;
        width: number;
        height: number;
    };
    video?: string;  // Añadimos la propiedad video como opcional
    links?: Array<{
        type: string;
        href: string;
        icon: React.ReactNode;
    }>;
}

export function useProjectFilter() {
    const [activeFilter, setActiveFilter] = useState<string>('all');

    // Usar DATA.projects directamente
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') {
            return DATA.projects;
        }
        
        return DATA.projects.filter(project =>
            project.technologies.some(tech => 
                tech.toLowerCase() === activeFilter.toLowerCase()
            )
        );
    }, [activeFilter]);

    // Obtener categorías únicas de las tecnologías
    const categories = useMemo(() => {
        const uniqueCategories = new Set<string>();
        DATA.projects.forEach(project => {
            project.technologies.forEach(tech => 
                uniqueCategories.add(tech.toLowerCase())
            );
        });
        return ['all', ...Array.from(uniqueCategories)].sort();
    }, []);

    return {
        filteredProjects,
        activeFilter,
        setActiveFilter,
        categories
    };
}