import { ElementType, ReactNode } from "react";
import { Code2, Database, Rocket, TrendingUp } from "lucide-react";
import { ProfileType } from "@/contexts/profile-context";
import {
    MLOpsDecoration,
    DataPipelinesDecoration,
    InfrastructureDecoration,
    DataAnalystDecoration
} from "@/components/landing/decorations";

export interface LandingCard {
    profile: ProfileType;
    icon: ElementType;
    colSpan: string;
    background: string;
    texture?: string;
    textureBlend?: string;
    iconWrapper: string;
    title: string;
    description: string;
    tags: string[];
    delay: number;
    align?: "left" | "center";
    tagClass: string;
    labelClass: string;
    decoration?: ReactNode;
}

export const getLandingCards = (language: string): LandingCard[] => [
    {
        profile: "ml-engineer",
        icon: Code2,
        colSpan: "sm:col-span-1",
        background:
            "radial-gradient(circle at 22% 18%, rgba(145, 112, 255, 0.42) 0%, rgba(47, 28, 94, 0.88) 48%, rgba(12, 7, 24, 0.96) 100%)",
        texture: "/img/patterns/mlops-particles.svg",
        textureBlend: "mix-blend-screen opacity-[0.65]",
        iconWrapper:
            "border border-[#8F7BFF]/35 bg-[#2D1F53]/65 text-[#E0DAFF] shadow-[0_0_26px_rgba(141,119,255,0.25)]",
        title: language === "en" ? "Model Deployment & MLOps" : "Despliegue de Modelos & MLOps",
        description:
            language === "en"
                ? "From notebooks to production—reproducibly and without drama."
                : "De notebooks a producción—reproducible y sin drama.",
        tags: ["TensorFlow", "FastAPI", "Docker"],
        delay: 0.1,
        align: "left",
        tagClass: "border-[#7C6BFA]/35 bg-[#2E2051]/60 text-[#DED8FF]",
        labelClass: "text-[#BDAEFF]/80 group-hover:text-[#E8E2FF]",
        decoration: <MLOpsDecoration />,
    },
    {
        profile: "data-engineer",
        icon: Database,
        colSpan: "sm:col-span-1",
        background:
            "linear-gradient(160deg, rgba(14, 34, 58, 0.94) 0%, rgba(6, 29, 48, 0.88) 52%, rgba(3, 23, 38, 0.96) 100%)",
        texture: "/img/patterns/pipelines-flow.svg",
        textureBlend: "mix-blend-screen opacity-[0.45]",
        iconWrapper:
            "border border-[#1FD9D3]/35 bg-[#08365D]/65 text-[#A5FFF9] shadow-[0_0_28px_rgba(31,217,211,0.28)]",
        title: language === "en" ? "Data Pipelines & Modeling" : "Pipelines de Datos & Modelado",
        description:
            language === "en"
                ? "Clean, testable pipelines. Good data engineering is invisible."
                : "Pipelines limpios y testeables. La buena ingeniería de datos es invisible.",
        tags: ["PostgreSQL", "Python", "n8n"],
        delay: 0.18,
        align: "center",
        tagClass: "border-[#1FD9D3]/25 bg-[#082C4B]/60 text-[#9BF7F0]",
        labelClass: "text-[#7BE3E0]/75 group-hover:text-[#C6FFFC]",
        decoration: <DataPipelinesDecoration />,
    },
    {
        profile: "devops-engineer",
        icon: Rocket,
        colSpan: "sm:col-span-1",
        background:
            "linear-gradient(155deg, rgba(11, 36, 21, 0.9) 0%, rgba(18, 62, 37, 0.85) 55%, rgba(7, 24, 14, 0.95) 100%)",
        texture: "/img/patterns/infra-grid.svg",
        textureBlend: "mix-blend-soft-light opacity-[0.7]",
        iconWrapper:
            "border border-[#8FF0B2]/30 bg-[#133824]/65 text-[#C9FFDC] shadow-[0_0_26px_rgba(71,207,132,0.25)]",
        title: language === "en" ? "Infrastructure & Observability" : "Infraestructura & Observabilidad",
        description:
            language === "en"
                ? "If it matters, we can see it. Boring, reliable deployments."
                : "Si importa, podemos verlo. Despliegues aburridos y confiables.",
        tags: ["Docker", "Kubernetes", "Grafana"],
        delay: 0.26,
        align: "left",
        tagClass: "border-[#6DE7A1]/25 bg-[#112E1D]/65 text-[#C6FFD9]",
        labelClass: "text-[#9CEABF]/75 group-hover:text-[#D4FFE8]",
        decoration: <InfrastructureDecoration />,
    },
    {
        profile: "data-analyst",
        icon: TrendingUp,
        colSpan: "sm:col-span-1",
        background:
            "linear-gradient(150deg, rgba(45, 26, 16, 0.9) 0%, rgba(60, 32, 12, 0.86) 55%, rgba(33, 18, 9, 0.94) 100%)",
        texture: "/img/patterns/analytics-tiles.svg",
        textureBlend: "mix-blend-soft-light opacity-[0.65]",
        iconWrapper:
            "border border-[#F4B860]/30 bg-[#3D2111]/65 text-[#FFECD1] shadow-[0_0_24px_rgba(244,184,96,0.25)]",
        title: language === "en" ? "Dashboards & Analytics" : "Dashboards & Analytics",
        description:
            language === "en"
                ? "Less dashboarding, more decisions."
                : "Menos dashboards, más decisiones.",
        tags: ["Power BI", "Tableau", "DAX"],
        delay: 0.34,
        align: "left",
        tagClass: "border-[#F4B860]/22 bg-[#3A2114]/60 text-[#FFE3C2]",
        labelClass: "text-[#FAD8A4]/80 group-hover:text-[#FFEBD2]",
        decoration: <DataAnalystDecoration />,
    },
];
