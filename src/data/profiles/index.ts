import { ProfileType } from "@/contexts/profile-context";
import { mlEngineerProfile } from "./ml-engineer.tsx";
import { dataEngineerProfile } from "./data-engineer.tsx";
import { devopsEngineerProfile } from "./devops-engineer.tsx";
import { dataAnalystProfile } from "./data-analyst.tsx";
import { ProfileData } from "./types";

export const PROFILE_DATA: Record<ProfileType, ProfileData> = {
  'ml-engineer': mlEngineerProfile,
  'data-engineer': dataEngineerProfile,
  'devops-engineer': devopsEngineerProfile,
  'data-analyst': dataAnalystProfile,
};

export * from "./types";
export { mlEngineerProfile, dataEngineerProfile, devopsEngineerProfile, dataAnalystProfile };
