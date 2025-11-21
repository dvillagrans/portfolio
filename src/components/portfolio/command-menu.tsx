"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useI18n } from "@/contexts/i18n-context";
import { useProfile } from "@/contexts/profile-context";
import {
    Command,
    Search,
    User,
    Briefcase,
    Mail,
    FileText,
    Languages,
    Laptop,
    Database,
    Server,
    LineChart,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileType } from "@/data/profiles/metadata";

export function CommandMenu() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const router = useRouter();
    const { language, setLanguage } = useI18n();
    const { setProfile, profile } = useProfile();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    interface CommandItem {
        icon: any;
        label: string;
        action: () => void;
        active?: boolean;
    }

    interface CommandGroup {
        heading: string;
        items: CommandItem[];
    }

    const groups: CommandGroup[] = [
        {
            heading: language === "en" ? "Navigation" : "Navegación",
            items: [
                {
                    icon: User,
                    label: language === "en" ? "Home" : "Inicio",
                    action: () => router.push("/"),
                },
                {
                    icon: Briefcase,
                    label: language === "en" ? "Projects" : "Proyectos",
                    action: () => router.push("/projects"),
                },
                {
                    icon: Mail,
                    label: language === "en" ? "Contact" : "Contacto",
                    action: () => {
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                        } else {
                            router.push("/#contact");
                        }
                    },
                },
            ],
        },
        {
            heading: language === "en" ? "Switch Profile" : "Cambiar Perfil",
            items: [
                {
                    icon: Laptop,
                    label: "Machine Learning Engineer",
                    action: () => {
                        setProfile("ml-engineer");
                        router.push("/ml-engineer");
                    },
                    active: profile === "ml-engineer",
                },
                {
                    icon: Database,
                    label: "Data Engineer",
                    action: () => {
                        setProfile("data-engineer");
                        router.push("/data-engineer");
                    },
                    active: profile === "data-engineer",
                },
                {
                    icon: Server,
                    label: "DevOps Engineer",
                    action: () => {
                        setProfile("devops-engineer");
                        router.push("/devops-engineer");
                    },
                    active: profile === "devops-engineer",
                },
                {
                    icon: LineChart,
                    label: "Data Analyst",
                    action: () => {
                        setProfile("data-analyst");
                        router.push("/data-analyst");
                    },
                    active: profile === "data-analyst",
                },
            ],
        },
        {
            heading: language === "en" ? "Settings" : "Configuración",
            items: [
                {
                    icon: Languages,
                    label: language === "en" ? "Switch to Spanish" : "Cambiar a Inglés",
                    action: () => setLanguage(language === "en" ? "es" : "en"),
                },
                {
                    icon: FileText,
                    label: language === "en" ? "Download Resume" : "Descargar CV",
                    action: () => {
                        // Logic to download current profile resume
                        const link = document.createElement('a');
                        link.href = `/resumes/diego_villagran_resume_${profile === 'ml-engineer' ? 'ml' : profile === 'data-engineer' ? 'etl' : profile === 'devops-engineer' ? 'devops' : 'analyst'}.pdf`;
                        link.download = `Diego_Villagran_${profile}_Resume.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    },
                },
            ],
        },
    ];

    const filteredGroups = groups.map(group => ({
        ...group,
        items: group.items.filter(item =>
            item.label.toLowerCase().includes(query.toLowerCase())
        )
    })).filter(group => group.items.length > 0);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="overflow-hidden p-0 shadow-2xl sm:max-w-[550px] bg-[#0a0a0a] border-white/10">
                <div className="flex items-center border-b border-white/10 px-4" cmdk-input-wrapper="">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-white" />
                    <input
                        className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-white/50 text-white disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder={language === "en" ? "Type a command or search..." : "Escribe un comando o busca..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <div className="flex items-center gap-1 text-xs text-white/40">
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono font-medium opacity-100">
                            <span className="text-xs">ESC</span>
                        </kbd>
                    </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto overflow-x-hidden py-2">
                    {filteredGroups.length === 0 && (
                        <div className="py-6 text-center text-sm text-white/50">
                            {language === "en" ? "No results found." : "No se encontraron resultados."}
                        </div>
                    )}

                    {filteredGroups.map((group, i) => (
                        <div key={group.heading} className="mb-2">
                            <div className="px-4 py-1.5 text-xs font-medium text-white/40 uppercase tracking-wider">
                                {group.heading}
                            </div>
                            {group.items.map((item, j) => (
                                <div
                                    key={item.label}
                                    onClick={() => runCommand(item.action)}
                                    className={cn(
                                        "group mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white",
                                        item.active && "bg-white/10 text-white"
                                    )}
                                >
                                    <item.icon className={cn("h-4 w-4 text-white/50 group-hover:text-white", item.active && "text-white")} />
                                    <span className="flex-1">{item.label}</span>
                                    {item.active && <ArrowRight className="h-3 w-3 text-white/50" />}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="border-t border-white/10 px-4 py-2.5 text-xs text-white/40 flex justify-between">
                    <span>
                        {language === "en" ? "Pro tip: Use" : "Tip: Usa"} <kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> {language === "en" ? "to navigate" : "para navegar"}
                    </span>
                    <span>
                        Portfolio v2.0
                    </span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
