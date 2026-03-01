const fs = require('fs');
const filepath = 'src/app/projects/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

const target = `                    <div className="flex flex-col items-end gap-3">
                      {project.caseStudy && (
                        <Link 
                          href={project.caseStudy}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
                        >
                          Read Architecture
                          <ArrowLeft className="h-3 w-3 rotate-135" />
                        </Link>
                      )}
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={\`inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors \${project.isFeatured ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-accent'}\`}
                      >
                        {archive.viewProject}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>`;

const replacement = `                    <div className="flex flex-col items-end gap-3">
                      {project.caseStudy && (
                        <Link 
                          href={project.caseStudy}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent transition-colors hover:text-white"
                        >
                          Read Architecture
                          <ArrowLeft className="h-3 w-3 rotate-135" />
                        </Link>
                      )}
                      {project.links ? (
                        project.links.map((lnk: any, lidx: number) => (
                          <a 
                            key={lidx}
                            href={lnk.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={\`inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors \${project.isFeatured ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-accent'}\`}
                          >
                            {lnk.label}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        ))
                      ) : (project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={\`inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-colors \${project.isFeatured ? 'text-gray-300 hover:text-white' : 'text-gray-400 hover:text-accent'}\`}
                        >
                          {archive.viewProject}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>`;

if(content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filepath, content, 'utf8');
    console.log("Archive UI updated");
} else {
    console.log("Could not find target in page.tsx");
}
