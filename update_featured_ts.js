const fs = require('fs');
const filepath = 'src/components/sections/FeaturedWork.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const target = `                <div className="mt-12 flex flex-col items-start gap-4">
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

const replacement = `                <div className="mt-12 flex flex-col items-start gap-4">
                  {(project as any).caseStudy && (
                    <Link
                      href={(project as any).caseStudy}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      Read Case Study <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                  {(project as any).links ? (
                    (project as any).links.map((lnk: any, idx: number) => (
                      <a
                        key={idx}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      >
                        {lnk.label} <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ))
                  ) : (project.href && !(project as any).caseStudy && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-charcoal opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      {t.work.inspect} <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>`;

if(content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("FeaturedWork updated");
} else {
    console.log("Could not find target in FeaturedWork.tsx");
}
