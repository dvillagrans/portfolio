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
    const [activeFilter, setActiveFilter] = useState<string>('all');    // Mapeo de tecnologías específicas a categorías generales
    const technologyToCategory: Record<string, string> = {
        // Data Science & Analytics
        'python': 'data-science',
        'pandas': 'data-science',
        'numpy': 'data-science',
        'matplotlib': 'data-science',
        'seaborn': 'data-science',
        'scikit-learn': 'data-science',
        'time series analysis': 'data-science',
        'sarima modeling': 'data-science',
        'statistical forecasting': 'data-science',
        'feature engineering': 'data-science',
        'geospatial analysis': 'data-science',
        'model deployment': 'data-science',
        'hyperparameter tuning': 'data-science',
        'data modeling': 'data-science',
        'etl processes': 'data-science',

        // Machine Learning & AI
        'tensorflow': 'machine-learning',
        'keras': 'machine-learning',
        'pytorch': 'machine-learning',
        'yolo': 'machine-learning',

        // Web Development
        'astro': 'web-development',
        'react': 'web-development',
        'html5': 'web-development',
        'css3': 'web-development',
        'javascript': 'web-development',
        'typescript': 'web-development',
        'tailwind css': 'web-development',
        'responsive design': 'web-development',
        'performance optimization': 'web-development',

        // Data Visualization & BI
        'power bi dax': 'data-visualization',
        'market intelligence': 'data-visualization',
        'interactive visualizations': 'data-visualization',
        'financial data visualization': 'data-visualization',
        'dashboard design': 'data-visualization',
        'pivot table reporting': 'data-visualization',

        // Automation & Tools
        'vba automation': 'automation',

        // Cloud & DevOps
        'vercel': 'cloud-devops',
        'docker': 'cloud-devops',
        'kubernetes': 'cloud-devops',
        'aws': 'cloud-devops',
        'azure': 'cloud-devops',
        'google cloud': 'cloud-devops',

        // Database
        'postgresql': 'database',
        'sql': 'database',
    };    // Nombres amigables para las categorías
    const categoryNames: Record<string, string> = {
        'all': 'Todos',
        'data-science': 'Data Science',
        'machine-learning': 'Machine Learning',
        'web-development': 'Web Development',
        'data-visualization': 'Visualización',
        'automation': 'Automatización',
        'cloud-devops': 'Cloud & DevOps',
        'database': 'Base de Datos'
    };

    // Función para obtener la categoría de una tecnología
    const getCategoryForTechnology = (tech: string): string => {
        const normalizedTech = tech.toLowerCase();
        return technologyToCategory[normalizedTech] || 'other';
    };

    // Usar DATA.projects directamente
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') {
            return DATA.projects;
        }

        return DATA.projects.filter(project =>
            project.technologies.some(tech =>
                getCategoryForTechnology(tech) === activeFilter
            )
        );
    }, [activeFilter]);

    // Obtener categorías únicas basadas en las tecnologías de los proyectos
    const categories = useMemo(() => {
        const usedCategories = new Set<string>();
        usedCategories.add('all');

        DATA.projects.forEach(project => {
            project.technologies.forEach(tech => {
                const category = getCategoryForTechnology(tech);
                if (category !== 'other') {
                    usedCategories.add(category);
                }
            });
        });

        return Array.from(usedCategories);
    }, []);

    return {
        filteredProjects,
        activeFilter,
        setActiveFilter,
        categories,
        categoryNames
    };
}