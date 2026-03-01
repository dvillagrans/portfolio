const fs = require('fs');

let content = fs.readFileSync('src/app/projects/page.tsx', 'utf8');

const oldTr = `<tr 
                  key={idx}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  className="group border-b border-offwhite/5 transition-colors hover:bg-offwhite/5"
                >
                  <td className="py-6 pl-2 pr-6 align-top">
                    {project.year}
                  </td>
                  <td className="py-6 px-6 align-top font-sans text-lg font-medium text-offwhite">
                    {project.title}
                  </td>
                  <td className="py-6 px-6 align-top text-gray-500">
                    {project.domain}
                  </td>
                  <td className="py-6 px-6 text-right align-top">
                    <a 
                      href={project.link}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 transition-colors hover:text-accent"
                    >
                      {archive.viewProject}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </td>
                </tr>`;

const newTr = `<tr 
                  key={idx}
                  ref={(el) => { rowsRef.current[idx] = el; }}
                  className={\`group border-b transition-colors \${
                    project.isFeatured 
                      ? "border-offwhite/20 bg-offwhite/[0.03] hover:bg-offwhite/[0.08]" 
                      : "border-offwhite/5 hover:bg-offwhite/5"
                  }\`}
                >
                  <td className="py-6 pl-2 pr-6 align-top">
                    {project.year}
                    {project.isFeatured && (
                      <span className="block mt-2 text-[10px] text-accent uppercase tracking-widest font-mono">
                        [CASE STUDY]
                      </span>
                    )}
                  </td>
                  <td className={\`py-6 px-6 align-top font-sans text-lg font-medium \${project.isFeatured ? 'text-accent font-bold' : 'text-offwhite'}\`}>
                    {project.title}
                  </td>
                  <td className="py-6 px-6 align-top text-gray-500">
                    {project.domain}
                  </td>
                  <td className="py-6 px-6 text-right align-top">
                    <div className="flex flex-col items-end gap-3">
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
                    </div>
                  </td>
                </tr>`;

content = content.replace(oldTr, newTr);
fs.writeFileSync('src/app/projects/page.tsx', content);
