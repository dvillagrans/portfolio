"use client";

import IconCloud from "@/components/magicui/icon-cloud";
import { DATA } from "@/data/resume";

// Mapeo de nombres de skills a slugs válidos de SimpleIcons
const skillToSlugMap: Record<string, string> = {
  "Python": "python",
  "Pandas": "pandas",
  "Numpy": "numpy",
  "Matplotlib": "matplotlib",
  "Seaborn": "python", // No tiene icono específico, usar python
  "anaconda": "anaconda",
  "Scikit-learn": "scikitlearn",
  "Tensorflow": "tensorflow",
  "Keras": "keras",
  "PyTorch": "pytorch",
  "Yolo": "yolo",
  "PostgreSQL": "postgresql",
  "SQL": "mysql", // Usar mysql como representación de SQL
  "Git": "git",
  "GitHub": "github",
  "Docker": "docker",
  "Kubernetes": "kubernetes",
  "AmazonAWS": "amazonaws",
  "Azure": "microsoftazure",
  "googlecloud": "googlecloud",
  "HTML5": "html5",
  "CSS3": "css3",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "React": "react",
  "Astro": "astro",
  "Vercel": "vercel",
  "googlecolab": "googlecolab"
};

// Convertir skills a slugs válidos
const slugs = DATA.skills
  .map(skill => skillToSlugMap[skill])
  .filter((slug): slug is string => slug !== undefined);

export function IconCloudDemo() {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
