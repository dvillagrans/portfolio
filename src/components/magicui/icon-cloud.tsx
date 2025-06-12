"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
      height: "300px", // Altura fija para evitar redimensionamientos bruscos
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.02, // Reducido para mayor estabilidad
    minSpeed: 0.01,
    freezeActive: true, // Mantiene los elementos más estables al hacer hover
    freezeDecel: true, // Ayuda con la estabilidad
    noSelect: true, // Evita la selección del texto
    noMouse: false, // Permite interacción con el mouse
    pinchZoom: false, // Deshabilita el zoom en dispositivos táctiles
    // dragControl: false,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs: string[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasRendered, setHasRendered] = useState(false);
  const { theme } = useTheme();

  // Usar una ref para almacenar los iconos y evitar re-renderizaciones innecesarias
  const iconsRef = useMemo(() => iconSlugs, [iconSlugs]);

  // Cargar los iconos cuando se monte el componente
  useEffect(() => {
    // Variable para controlar si el componente está montado
    let isMounted = true;
    
    // Si ya se han cargado iconos previamente y no han cambiado, no volver a cargar
    if (hasRendered && data) return;
    
    setIsLoading(true);
    
    fetchSimpleIcons({ slugs: iconsRef })
      .then((result) => {
        // Solo actualizar el estado si el componente sigue montado
        if (isMounted) {
          setData(result);
          setIsLoading(false);
          // Marcar que ya se ha renderizado para evitar recarga durante scroll
          setHasRendered(true);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error loading icons:", err);
          setError(err);
          setIsLoading(false);
        }
      });
      
    // Función de limpieza para prevenir actualizar estados en componentes desmontados
    return () => {
      isMounted = false;
    };
  }, [iconsRef, hasRendered, data]);
  // Memorizar los iconos renderizados para evitar cálculos innecesarios durante el scroll
  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "light"),
    );
  }, [data, theme]);

  // Memorizar el componente Cloud para evitar re-renderizaciones durante el scroll
  const cloudComponent = useMemo(() => {
    // Si está cargando o hay error, retornar un estado adecuado
    if (isLoading) {
      return (
        <div className="flex h-[300px] w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      );
    }

    // Mostrar un mensaje de error si falla la carga
    if (error || !data) {
      return (
        <div className="flex h-[300px] w-full items-center justify-center text-center">
          <p className="text-sm text-gray-500">No se pudieron cargar las habilidades</p>
        </div>
      );
    }

    // Renderizar la nube solo cuando los datos estén disponibles
    return (
      // @ts-ignore
      <Cloud {...cloudProps}>
        <>{renderedIcons}</>
      </Cloud>
    );
  }, [data, error, isLoading, renderedIcons]);

  // Usar React.memo para evitar re-renderizaciones innecesarias durante el scroll
  return (
    <div className="relative w-full h-[300px]">
      {cloudComponent}
    </div>
  );
}
