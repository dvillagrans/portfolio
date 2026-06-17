import type { CvSkillGroups } from "./types";

export const CV_SKILL_GROUPS: CvSkillGroups = {
  languages: ["Python", "TypeScript", "JavaScript", "SQL"],
  ml: [
    "Scikit-learn",
    "PyTorch",
    "TensorFlow",
    "K-Means",
    "Fuzzy C-Means",
    "MLflow",
    "LLMs",
    "RAG",
    "Embeddings",
  ],
  data: [
    "Pandas",
    "NumPy",
    "PySpark",
    "Databricks",
    "PostgreSQL",
    "Power BI",
    "Streamlit",
    "Plotly",
    "ETL",
  ],
  backend: ["FastAPI", "Node.js", "Express", "Prisma", "Supabase", "Redis", "n8n"],
  frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript", "GSAP"],
  devops: ["Docker", "Kubernetes", "GitHub Actions", "Azure", "AWS", "Vercel", "Grafana", "Prometheus"],
};

/** Flat list for JD matching. */
export function getAllCvSkills(groups: CvSkillGroups = CV_SKILL_GROUPS): string[] {
  return Object.values(groups).flat();
}
