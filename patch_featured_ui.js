const fs = require('fs');

let content = fs.readFileSync('src/components/sections/FeaturedWork.tsx', 'utf8');

// Ensure Link is imported if we are using Next.js client-side routing
if (!content.includes('import Link from "next/link";')) {
  content = content.replace(
    'import { ArrowUpRight } from "lucide-react";',
    'import { ArrowUpRight, ArrowRight } from "lucide-react";\nimport Link from "next/link";'
  );
}

const oldLinkBlock = `<a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                >
                  {t.work.inspect} <ArrowUpRight className="w-3 h-3" />
                </a>`;

const newLinkBlock = `<div className="mt-12 flex flex-col items-start gap-4">
                  {(project as any).caseStudy ? (
                    <Link
                      href={(project as any).caseStudy}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      Read Case Study <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      {t.work.inspect} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>`;

content = content.replace(oldLinkBlock, newLinkBlock);
fs.writeFileSync('src/components/sections/FeaturedWork.tsx', content);

