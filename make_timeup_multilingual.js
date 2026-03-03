const fs = require('fs');

const file = 'src/app/projects/timeup/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
content = content.replace(
  'import { Link } from "next-view-transitions";\nimport Navbar from "@/components/layout/Navbar";',
  'import { Link } from "next-view-transitions";\nimport Navbar from "@/components/layout/Navbar";\nimport { useLanguage } from "@/i18n/LanguageContext";'
);

// 2. Remove hardcoded meta
content = content.replace(/const meta = \[\s+[\s\S]+?\s+\];\n/g, "");

// 3. Inject hook inside component
content = content.replace(
  'export default function TimeUpCaseStudy() {\n  const containerRef = useRef<HTMLDivElement>(null);',
  'export default function TimeUpCaseStudy() {\n  const { t } = useLanguage();\n  const dict = t.timeup;\n  const containerRef = useRef<HTMLDivElement>(null);'
);


// 4. Transform elements to use dict
content = content.replace(
  /<Link href="\/projects"[^>]+>\s*<ArrowLeft size=\{16\} \/> Volver al Archivo\s*<\/Link>/g,
  '<Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#00C9FF] transition-colors uppercase font-mono tracking-widest"><ArrowLeft size={16} /> {dict.back}</Link>'
);

content = content.replace(
  /<p className="text-xl md:text-3xl text-white\/70 tracking-normal font-serif italic mb-6">\s*SaaS Operativo para el sector de la salud y bienestar\.\s*<\/p>/g,
  '<p className="text-xl md:text-3xl text-white/70 tracking-normal font-serif italic mb-6">{dict.subtitle}</p>'
);

content = content.replace(
  /<h3 className="text-\[#00C9FF\] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size=\{14\}\/> El Reto<\/h3>\s*<p className="text-sm text-white\/60 leading-relaxed font-sans">\s*Negocios locales operando ciegamente con <span className="text-white font-medium">WhatsApp y libretas<\/span>\. Dueños ocupados permanentemente y un staff de atención con baja afinidad a herramientas tecnológicas complejas\.\s*<\/p>/g,
  '<h3 className="text-[#00C9FF] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><AlertCircle size={14}/> {dict.tldr.challenge.title}</h3><p className="text-sm text-white/60 leading-relaxed font-sans">{dict.tldr.challenge.text1}<span className="text-white font-medium">{dict.tldr.challenge.bold}</span>{dict.tldr.challenge.text2}</p>'
);

content = content.replace(
  /<h3 className="text-\[#00E3CC\] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size=\{14\}\/> La Solución<\/h3>\s*<p className="text-sm text-white\/60 leading-relaxed font-sans">\s*Plataforma <span className="text-white font-medium">Multi-tenant Cloud<\/span> con onboarding amigable, acceso <span className="text-\[#00E3CC\]">Passkeys biométrico<\/span> sin contraseñas engorrosas y flujo kinético Real-Time\.\s*<\/p>/g,
  '<h3 className="text-[#00E3CC] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size={14}/> {dict.tldr.solution.title}</h3><p className="text-sm text-white/60 leading-relaxed font-sans">{dict.tldr.solution.text1}<span className="text-white font-medium">{dict.tldr.solution.bold}</span>{dict.tldr.solution.text2}<span className="text-[#00E3CC]">{dict.tldr.solution.cyan}</span>{dict.tldr.solution.text3}</p>'
);

content = content.replace(
  /<h3 className="text-\[#4B5DFF\] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size=\{14\}\/> El Impacto<\/h3>\s*<p className="text-sm text-\[#4B5DFF\]\/90 leading-relaxed font-sans">\s*<span className="text-white font-medium">MVP construido en 10 semanas<\/span> bajo una arquitectura optimizada\. Despliegue con costos operativos cercanos a cero antes de traccionar volumen productivo\.\s*<\/p>/g,
  '<h3 className="text-[#4B5DFF] font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={14}/> {dict.tldr.impact.title}</h3><p className="text-sm text-[#4B5DFF]/90 leading-relaxed font-sans"><span className="text-white font-medium">{dict.tldr.impact.bold}</span>{dict.tldr.impact.text1}</p>'
);

content = content.replace(
  /\{meta\.map\(\(item, idx\) => \(/g,
  '{dict.meta.map((item: any, idx: number) => ('
);

content = content.replace(
  /App Pública/g, '{dict.links.public}'
);
content = content.replace(
  /Panel Negocios/g, '{dict.links.business}'
);

content = content.replace(
  /"Si el onboarding tomaba más de <span className="text-\[#00C9FF\] italic font-medium">diez minutos<\/span>, la implementación fracasaba\."/g,
  '"{dict.quote.text}<span className="text-[#00C9FF] italic font-medium">{dict.quote.bold}</span>{dict.quote.text2}"'
);

content = content.replace(
  /La Premisa Funcional/g, '{dict.quote.title}'
);

content = content.replace(
  /<h2 className="text-sm text-\[#00C9FF\] font-mono tracking-widest uppercase mb-3">01 \/\/ Restricciones Inflexibles<\/h2>\s*<p className="text-3xl md:text-4xl font-serif text-white\/80 leading-tight">Muros de contención\.<\/p>\s*<\/div>\s*<p className="font-mono text-xs text-white\/40 md:max-w-\[200px\] border-l border-white\/20 pl-4 py-1">El contexto que definió la arquitectura y nos obligó a evitar la sobree-ingeniería\.<\/p>/g,
  '<h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">{dict.constraints.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.constraints.title2}</p></div><p className="font-mono text-xs text-white/40 md:max-w-[200px] border-l border-white/20 pl-4 py-1">{dict.constraints.desc}</p>'
);


// Complex inner translations for Bento Constraints
content = content.replace(
  /<h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 relative z-10 w-fit">Usuarios de Baja Paciencia<\/h3>\s*<p className="text-white\/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">\s*Dueños de negocios de 30 a 50 años\. El flujo no podía asumir <span className="text-\[#00C9FF\] font-medium">ningún conocimiento técnico previo<\/span>\. Por eso transicionamos de esquemas lentos de email a utilizar <span className="text-white border-b border-white\/20 pb-0\.5">Hardware Biométrico nativo \(Passkeys\)<\/span>\.\s*<\/p>/g,
  '<h3 className="text-2xl lg:text-3xl font-serif text-white mb-4 relative z-10 w-fit">{dict.constraints.c1.title}</h3><p className="text-white/60 leading-relaxed font-sans max-w-lg relative z-10 text-sm lg:text-base">{dict.constraints.c1.text1}<span className="text-[#00C9FF] font-medium">{dict.constraints.c1.bold1}</span>{dict.constraints.c1.text2}<span className="text-white border-b border-white/20 pb-0.5">{dict.constraints.c1.bold2}</span>.</p>'
);

content = content.replace(
  /<h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Clock className="text-\[#00E3CC\]" size=\{24\}\/> MVP a Contrarreloj<\/h3>\s*<p className="text-white\/60 leading-relaxed font-sans text-sm">Desarrollado y modelado por un <span className="text-\[#00E3CC\] font-medium">solo mantenedor<\/span>, obligando a elegir herramientas hiper-productivas \(Turborepo \+ Next\)\.<\/p>/g,
  '<h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Clock className="text-[#00E3CC]" size={24}/> {dict.constraints.c2.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c2.text1}<span className="text-[#00E3CC] font-medium">{dict.constraints.c2.bold1}</span>{dict.constraints.c2.text2}</p>'
);

content = content.replace(
  /<h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Shield className="text-\[#4B5DFF\]" size=\{24\}\/> Calidad del Tenant<\/h3>\s*<p className="text-white\/60 leading-relaxed font-sans text-sm">\s*Sistema de Onboarding semi-abierto\. Requiere aprobación administrativa en el Backend, generando estados complejos en BD <span className="text-\[#4B5DFF\] font-mono text-\[10px\] bg-\[#4B5DFF\]\/10 px-2 py-1 rounded ml-1">PENDDING<\/span>\.\s*<\/p>/g,
  '<h3 className="text-xl font-serif text-white mb-4 flex items-center gap-3"><Shield className="text-[#4B5DFF]" size={24}/> {dict.constraints.c3.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c3.text1}<span className="text-[#4B5DFF] font-mono text-[10px] bg-[#4B5DFF]/10 px-2 py-1 rounded ml-1">{dict.constraints.c3.tag}</span>.</p>'
);

content = content.replace(
  /<h3 className="text-xl lg:text-2xl font-serif text-white mb-4 flex items-center gap-3"><Zap className="text-\[#00C9FF\]" size=\{24\}\/> Serverless Zero-Cost<\/h3>\s*<p className="text-white\/60 leading-relaxed font-sans text-sm">La app debía poder pivotear con un burn rate muerto\. Despliegue puro en <span className="text-white font-medium">Vercel & Supabase Free<\/span> aislando los componentes demandantes\.<\/p>/g,
  '<h3 className="text-xl lg:text-2xl font-serif text-white mb-4 flex items-center gap-3"><Zap className="text-[#00C9FF]" size={24}/> {dict.constraints.c4.title}</h3><p className="text-white/60 leading-relaxed font-sans text-sm">{dict.constraints.c4.text1}<span className="text-white font-medium">{dict.constraints.c4.bold1}</span>{dict.constraints.c4.text2}</p>'
);


content = content.replace(
  /<span className="text-white\/90 font-serif text-lg">Módulo Legal Estricto<\/span>\s*<\/div>\s*<p className="text-sm text-white\/50 font-sans">\s*Gestión innegociable de <span className="text-white\/80">Consentimientos Informados Digitales<\/span> con firmas electrónicas en PDF para tratamientos médicos invasivos\.\s*<\/p>/g,
  '<span className="text-white/90 font-serif text-lg">{dict.constraints.c5.title}</span></div><p className="text-sm text-white/50 font-sans">{dict.constraints.c5.text1}<span className="text-white/80">{dict.constraints.c5.bold1}</span>{dict.constraints.c5.text2}</p>'
);

// Interfaces 
content = content.replace(
  /<h2 className="text-sm text-\[#00C9FF\] font-mono tracking-widest uppercase mb-3">02 \/\/ Interfaces Ecosistema<\/h2>\s*<p className="text-3xl md:text-4xl font-serif text-white\/80 leading-tight">Herramientas dedicadas por rol\.<\/p>/g,
  '<h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">{dict.interfaces.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.interfaces.title2}</p>'
);

content = content.replace(
  /<p className="font-mono text-\[10px\] md:text-xs tracking-widest text-\[#00C9FF\] uppercase mb-1">MÓDULO : ADMIN<\/p>\s*<p className="font-serif text-white\/90 text-sm md:text-base">Centro de Control y Analíticas Globales\.<\/p>/g,
  '<p className="font-mono text-[10px] md:text-xs tracking-widest text-[#00C9FF] uppercase mb-1">{dict.interfaces.admin.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.interfaces.admin.desc}</p>'
);

content = content.replace(
  /<p className="font-mono text-\[10px\] md:text-xs tracking-widest text-\[#00E3CC\] uppercase mb-1">MÓDULO : OWNER<\/p>\s*<p className="font-serif text-white\/90 text-sm md:text-base">Métricas de Rendimiento y Configuración\.<\/p>/g,
  '<p className="font-mono text-[10px] md:text-xs tracking-widest text-[#00E3CC] uppercase mb-1">{dict.interfaces.owner.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.interfaces.owner.desc}</p>'
);

content = content.replace(
  /<p className="font-mono text-\[10px\] md:text-xs tracking-widest text-\[#4B5DFF\] uppercase mb-1">MÓDULO : STAFF<\/p>\s*<p className="font-serif text-white\/90 text-sm md:text-base">Agenda Viva y Manejo Cliente-Local\.<\/p>/g,
  '<p className="font-mono text-[10px] md:text-xs tracking-widest text-[#4B5DFF] uppercase mb-1">{dict.interfaces.staff.tag}</p><p className="font-serif text-white/90 text-sm md:text-base">{dict.interfaces.staff.desc}</p>'
);


// Architecture
content = content.replace(
  /<h2 className="text-sm text-\[#00C9FF\] font-mono tracking-widest uppercase mb-3">03 \/\/ Arquitectura y Decisiones<\/h2>\s*<p className="text-3xl md:text-4xl font-serif text-white\/80 leading-tight">Trade-offs que dan vida al negocio\.<\/p>/g,
  '<h2 className="text-sm text-[#00C9FF] font-mono tracking-widest uppercase mb-3">{dict.architecture.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 leading-tight">{dict.architecture.title2}</p>'
);

content = content.replace(
  /<span className="text-\[10px\] font-mono tracking-widest text-\[#00C9FF\] mb-3 block">3\.1 \/ ESTRUCTURA DE REPOSITORIO<\/span>\s*<h3 className="text-2xl font-serif text-white mb-2">Monorepositorio Turborepo<\/h3>[\s\S]+?Construir múltiples ecosistemas React obligaba a cruzar lógicas de negocio, tipos en TypeScript y esquemas Prisma\. Optamos por la rigidez inicial de <span className="text-white">monorepositorios para orquestar<\/span> múltiples bases acopladas con cacherréo automático\.\s*<\/p>\s*<div className="bg-gradient-to-r from-\[#4B5DFF\]\/10 to-transparent border-l-2 border-\[#4B5DFF\] rounded-r-xl p-6">\s*<h4 className="text-\[#4B5DFF\] uppercase text-\[10px\] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size=\{12\}\/> El Costo Operativo<\/h4>\s*<p className="text-sm text-\[#4B5DFF\]\/80 font-sans">El tooling de arranque retrasó la v\.1, pero escalar entre un despliegue y otro fue totalmente instantáneo semanas después\.<\/p>/g,
  '<span className="text-[10px] font-mono tracking-widest text-[#00C9FF] mb-3 block">{dict.architecture.d1.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d1.title}</h3></div><LayoutTemplate className="text-white/10 mt-12 group-hover:text-[#00C9FF]/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d1.desc}<span className="text-white">{dict.architecture.d1.bold}</span>{dict.architecture.d1.desc2}</p><div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6"><h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d1.costTitle}</h4><p className="text-sm text-[#4B5DFF]/80 font-sans">{dict.architecture.d1.costDesc}</p>'
);

content = content.replace(
  /<span className="text-\[10px\] font-mono tracking-widest text-\[#00E3CC\] mb-3 block">3\.2 \/ SINCRONIZACIÓN STATEFUL<\/span>\s*<h3 className="text-2xl font-serif text-white mb-2">Aislamiento de WebSockets<\/h3>[\s\S]+?Plataformas como Vercel y Edge Functions castigan las conexiones abiertas prolongadas \(Timeouts y SSE muertos en minutos\)\. Extrajimos el motor bidireccional a una Máquina Virtual con <span className="text-\[#00E3CC\]">NodeJS \+ pm2 \+ Redis PubSub<\/span> actuando como pipeline en tiempo real\.\s*<\/p>\s*<div className="bg-gradient-to-r from-\[#4B5DFF\]\/10 to-transparent border-l-2 border-\[#4B5DFF\] rounded-r-xl p-6">\s*<h4 className="text-\[#4B5DFF\] uppercase text-\[10px\] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size=\{12\}\/> El Costo Operativo<\/h4>\s*<p className="text-sm text-\[#4B5DFF\]\/80 font-sans">Fragmentación de monitoreo; pasamos de solo mirar logs de Vercel a tener que revisar métricas en un droplet de Ubuntu constantemente\.<\/p>/g,
  '<span className="text-[10px] font-mono tracking-widest text-[#00E3CC] mb-3 block">{dict.architecture.d2.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d2.title}</h3></div><Database className="text-white/10 mt-12 group-hover:text-[#00E3CC]/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d2.desc}<span className="text-[#00E3CC]">{dict.architecture.d2.bold}</span>{dict.architecture.d2.desc2}</p><div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6"><h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d2.costTitle}</h4><p className="text-sm text-[#4B5DFF]/80 font-sans">{dict.architecture.d2.costDesc}</p>'
);


content = content.replace(
  /<span className="text-\[10px\] font-mono tracking-widest text-\[#4B5DFF\] mb-3 block">3\.3 \/ EXPERIENCIA DE AUTENTICACIÓN<\/span>\s*<h3 className="text-2xl font-serif text-white mb-2">Ingreso Biométrico WebAuthn<\/h3>[\s\S]+?Obligar al staff local a recordar strings largos interrumpe su labor operativa\. La implementación fuerte de APIs de biometría integradas en el hardware \(FaceID \/ Fingerprint\) cortó la fricción de acceso desde <span className="text-white">varios minutos a fracciones de segundo<\/span> en la tablet del mostrador\.\s*<\/p>\s*<div className="bg-gradient-to-r from-\[#4B5DFF\]\/10 to-transparent border-l-2 border-\[#4B5DFF\] rounded-r-xl p-6">\s*<h4 className="text-\[#4B5DFF\] uppercase text-\[10px\] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size=\{12\}\/> El Costo Operativo<\/h4>\s*<p className="text-sm text-\[#4B5DFF\]\/80 font-sans">Altísima complejidad en el fallback; obligó a mantener un robusto sistema extra por Magic Links SMTP\.<\/p>/g,
  '<span className="text-[10px] font-mono tracking-widest text-[#4B5DFF] mb-3 block">{dict.architecture.d3.nav}</span><h3 className="text-2xl font-serif text-white mb-2">{dict.architecture.d3.title}</h3></div><Shield className="text-white/10 mt-12 group-hover:text-[#4B5DFF]/20 transition-colors" size={64} strokeWidth={1} /></div><div className="p-8 md:p-12 md:w-2/3 flex flex-col gap-6 justify-center"><p className="text-white/70 leading-relaxed font-sans text-sm lg:text-base">{dict.architecture.d3.desc}<span className="text-white">{dict.architecture.d3.bold}</span>{dict.architecture.d3.desc2}</p><div className="bg-gradient-to-r from-[#4B5DFF]/10 to-transparent border-l-2 border-[#4B5DFF] rounded-r-xl p-6"><h4 className="text-[#4B5DFF] uppercase text-[10px] tracking-widest font-mono mb-2 flex items-center gap-2"><Activity size={12}/> {dict.architecture.d3.costTitle}</h4><p className="text-sm text-[#4B5DFF]/80 font-sans">{dict.architecture.d3.costDesc}</p>'
);

// Postmortem
content = content.replace(
  /<h2 className="text-sm text-\[#00E3CC\] font-mono tracking-widest uppercase mb-3">04 \/\/ Post-Mortem System<\/h2>\s*<p className="text-3xl md:text-4xl font-serif text-white\/80 mb-6 leading-tight">Aprendizajes crudos al golpear Producción\.<\/p>\s*<p className="text-sm font-sans text-white\/50 leading-relaxed">\s*Las implementaciones técnicas puras raramente sobreviven al comportamiento orgánico del usuario final y de las limitaciones Cloud de cueto inferior\. Lo que realmente se incendió y cómo fue blindado\.\s*<\/p>/g,
  '<h2 className="text-sm text-[#00E3CC] font-mono tracking-widest uppercase mb-3">{dict.lessons.title1}</h2><p className="text-3xl md:text-4xl font-serif text-white/80 mb-6 leading-tight">{dict.lessons.title2}</p><p className="text-sm font-sans text-white/50 leading-relaxed">{dict.lessons.desc}</p>'
);

content = content.replace(
  /<h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">Asfixia del Connection Pooler <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size=\{18\}\/><\/h3>\s*<p className="text-sm font-sans text-white\/50 mb-5 leading-relaxed">Combinar AWS Serverless con motores de Base de Datos fríos en Supabase terminaba quemando cuotas de conexión ineficientes destrozando los pipelines\.<\/p>\s*<div className="flex gap-2">\s*<span className="text-\[10px\] font-mono tracking-widest text-\[#00E3CC\] bg-\[#00E3CC\]\/10 border border-\[#00E3CC\]\/20 px-3 py-1\.5 rounded-full inline-block">MIGRADO DE URGENCIA A TRANSACTION POOLERS ACTIVOS<\/span>/g,
  '<h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l1.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l1.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l1.tag}</span>'
);

content = content.replace(
  /<h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">WebAuthn & Origin Mismatch <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size=\{18\}\/><\/h3>\s*<p className="text-sm font-sans text-white\/50 mb-5 leading-relaxed">Un insignificante slash '\/' sobrante en la terminación CORS del proyecto en producción colapsó todo el flujo de llaves digitales de seguridad en el deploy inicial porque rompen la seguridad criptográfica\.<\/p>\s*<div className="flex gap-2">\s*<span className="text-\[10px\] font-mono tracking-widest text-\[#00E3CC\] bg-\[#00E3CC\]\/10 border border-\[#00E3CC\]\/20 px-3 py-1\.5 rounded-full inline-block">ESPEJADO OBLIGATORIO DE ENTORNO PREVIEW CI\/CD<\/span>/g,
  '<h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l2.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l2.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l2.tag}</span>'
);

content = content.replace(
  /<h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">Purgatorios de Estado y Usuarios Fantasma <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size=\{18\}\/><\/h3>\s*<p className="text-sm font-sans text-white\/50 mb-5 leading-relaxed">Entidades semi-aprobadas creaban inconsistencia al arrastrar valores que contaminaban las métricas de cohortes posteriores en KPIs\.<\/p>\s*<div className="flex gap-2">\s*<span className="text-\[10px\] font-mono tracking-widest text-\[#00E3CC\] bg-\[#00E3CC\]\/10 border border-\[#00E3CC\]\/20 px-3 py-1\.5 rounded-full inline-block">RESTRICCIÓN ABSOLUTA DE ESTADOS INTERMEDIOS \(BOOLEANS AL EXTREMO\)<\/span>/g,
  '<h3 className="text-xl font-serif text-white mb-3 flex items-center gap-3">{dict.lessons.l3.title} <AlertCircle className="text-red-400 opacity-60 group-hover:opacity-100 transition-opacity" size={18}/></h3><p className="text-sm font-sans text-white/50 mb-5 leading-relaxed">{dict.lessons.l3.desc}</p><div className="flex gap-2"><span className="text-[10px] font-mono tracking-widest text-[#00E3CC] bg-[#00E3CC]/10 border border-[#00E3CC]/20 px-3 py-1.5 rounded-full inline-block">{dict.lessons.l3.tag}</span>'
);

content = content.replace(
  /<span className="mb-4 sm:mb-0">LAST UPDATED: Q1 2026 \/\/ TIMEUP SYSTEM ARCHITECTURE LOG<\/span>\s*<span className="text-\[#00C9FF\]\/50 border border-\[#00C9FF\]\/20 px-4 py-2 rounded-full">ESTADO: EN PRODUCCIÓN CONSTANTE<\/span>/g,
  '<span className="mb-4 sm:mb-0">{dict.footer.text}</span><span className="text-[#00C9FF]/50 border border-[#00C9FF]/20 px-4 py-2 rounded-full">{dict.footer.status}</span>'
);


fs.writeFileSync(file, content);
